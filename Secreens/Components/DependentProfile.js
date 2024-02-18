// To Show details of dependent
import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { ChildAvatar } from "../../assets/images";
import Icon from "react-native-vector-icons/FontAwesome";

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

function DependentProfile(props) {
  const childDetails = props.route.params.childDetails;

  return (
    <ScrollView>
      <View style={style.logo}>
        <ChildAvatar />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={style.name}>{childDetails.name}</Text>
        <Text style={style.email}>{childDetails.email}</Text>
      </View>

      <View style={{ alignItems: "flex-start" }}>
        {Detail("ID", "id-badge", childDetails.id)}
        {Detail("Date of birth", "birthday-cake", childDetails.dob)}
        {Detail("Phone", "phone", childDetails.phone)}
        {Detail("Address", "location-arrow", childDetails.address)}
      </View>
    </ScrollView>
  );
}

export default DependentProfile;

const style = StyleSheet.create({
  logo: {
    marginTop: "10%",
    alignItems: "center",
    paddingBottom: 0,
  },
  name: {
    marginTop: "5%",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  email: { color: "grey", fontSize: 15 },
});
