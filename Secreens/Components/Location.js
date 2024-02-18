import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Location = (props) => {
  const location = props.data.value;
  const navigation = props.data.navigation;
  return (
    <TouchableOpacity
      style={style.location}
      onPress={() => {
        navigation.push("Login", { location, navigation });
      }}
    >
      <Text style={style.locationText}>{props.data.name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  location: {
    width: "80%",
    // height: "15%",
    backgroundColor: "#28a745",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  locationText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Location;
