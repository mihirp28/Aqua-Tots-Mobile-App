import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MessageImg } from "../assets/images";

function Message({ navigation }) {
  const [message, setMessage] = useState("");
  const [validMessage, setValidMessage] = useState(true);
  // console.log(message);

  // send message or email to swim school
  async function sendMessage() {
    let headersList = {
      Accept: "*/*",
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      personalizations: [
        { to: [{ email: "divyesh.pithadiya@webdroid.co.in" }] },
      ],
      from: { email: "support@xcallisto.com" },
      subject: "Message from Divyesh Pithadiya",
      content: [
        {
          type: "text/plain",
          value: message,
        },
      ],
    });

    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        Alert.alert(
          "Message sent",
          "Thank you!, We will connect with you shortly",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.pop();
              },
            },
          ]
        );
        console.log(response.text());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View>
        <View style={style.logo}>
          <MessageImg />
        </View>
        <View
          style={{
            alignItems: "center",
            height: "80%",
            // backgroundColor: "black",
          }}
        >
          <TextInput
            style={style.textArea}
            placeholder="Write your message here"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              if (text.length === 0) {
                setValidMessage(false);
              } else {
                setValidMessage(true);
              }
              setMessage(text);
            }}
          />
          {validMessage === false ? (
            <Text
              style={{
                alignSelf: "center",
                color: "red",
                marginTop: "5%",
                fontSize: 20,
              }}
            >
              Enter valid message
            </Text>
          ) : null}
          <TouchableOpacity
            style={style.sendMessage}
            onPress={() => {
              if (message.length !== 0 && validMessage.length !== 0) {
                sendMessage();
              } else {
                Alert.alert("Please enter valid message");
              }
            }}
          >
            <Text style={style.sendMessageText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Message;

const style = StyleSheet.create({
  logo: {
    marginTop: "10%",
    alignItems: "center",
    paddingBottom: 0,
  },
  textArea: {
    backgroundColor: "white",
    width: "80%",
    marginTop: "10%",
    borderWidth: 1,
    borderColor: "#0047AB",
    fontSize: 20,
    padding: 40,
    textAlign: "center",
    borderRadius: 10,
  },
  sendMessage: {
    width: "80%",
    backgroundColor: "#0047AB",
    padding: "3%",
    marginTop: "7%",
    alignItems: "center",
    shadowColor: "#000",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.0,
    elevation: 10,
  },
  sendMessageText: {
    color: "white",
    fontSize: 20,
  },
});
