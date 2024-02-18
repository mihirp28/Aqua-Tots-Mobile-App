import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaleAvatar, FemaleAvatar } from "../assets/images";
import { GetRequest } from "../Helper/Requests";
import { getLocation, getUniqueKey } from "../Helper/Storages";
import Loading, { LoadingHighlight } from "./Components/Loading";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfilePage = () => {
  const [loaded, setLoaded] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pronoun, setPronoun] = useState(null);
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  // Get details of user
  async function getUserDetails() {
    const data = await GetRequest(
      "https://atss-" +
        (await getLocation()) +
        ".pike13.com/api/v2/front/people/me",
      {
        Authorization: "Bearer " + (await getUniqueKey()),
      }
    );
    console.log(await getUniqueKey());
    // console.log(data.people[0]);

    setFirstName(data.people[0].first_name);
    setLastName(data.people[0].last_name);
    setMiddleName(data.people[0].middle_name);
    setAddress(data.people[0].address);
    setEmail(data.people[0].email);
    setPronoun(data.people[0].pronoun);
    setDob(data.people[0].birthdate);
    setId(data.people[0].id);
    setPhone(data.people[0].phone);
    setFullName(data.people[0].name);

    setLoaded(true);
    return data;
  }

  const Avatar = () => {
    if (pronoun === null) {
      return <MaleAvatar />;
    } else if (
      pronoun === "female" ||
      pronoun === "Female" ||
      pronoun === "FEMALE"
    ) {
      return <FemaleAvatar />;
    } else {
      return <MaleAvatar />;
    }
  };

  // User detail component
  const Detail = (detailName, icon, detail) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: "4%",
          borderColor: "grey",
          width: "100%",
        }}
      >
        <Icon style={{ width: "10%" }} name={icon} size={30} color="grey" />
        <View
          style={{
            marginLeft: "4%",
            flexDirection: "row",
            width: "90%",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            {detailName} -
          </Text>
          <Text style={{ color: "#0047AB", fontSize: 20 }}> {detail}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    try {
      getUserDetails();
    } catch (Exception) {
      Alert.alert("Please check your internet connection");
    }
  }, []);

  return (
    <View style={{ height: "100%" }}>
      {loaded === false ? <LoadingHighlight /> : null}

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={style.dashboardScreen}>
          <View style={style.topSection}>
            <View style={style.logo}>
              <Avatar />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={style.name}>
                {/* {firstName} {lastName} */}
                {fullName}
              </Text>
              <Text style={style.email}>{email}</Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          {Detail("ID", "id-badge", id)}
          {Detail("Date of birth", "birthday-cake", dob)}
          {Detail("Phone", "phone", phone)}
          {Detail("Address", "location-arrow", address)}
        </View>
      </ScrollView>
      {/* <View style={style.updateDetailsPosition}>
        <TouchableOpacity style={style.updateDetails}>
          <Text style={{ color: "#0047AB", fontSize: 20, color: "white" }}>
            UPDATE DETAILS
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  topSection: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    paddingBottom: "10%",
    borderBottomColor: "grey",
  },
  logo: {
    // marginBottom: "10%",
    width: "75%",
    resizeMode: "contain",
    marginTop: "10%",
    alignItems: "center",
  },
  dashboardScreen: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  updateDetails: {
    borderWidth: 1,
    borderColor: "#0047AB",
    width: "100%",
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
    backgroundColor: "#0047AB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.0,
    elevation: 10,
  },
  updateDetailsPosition: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    marginTop: "5%",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  email: { color: "grey", fontSize: 15 },
});

export default ProfilePage;
