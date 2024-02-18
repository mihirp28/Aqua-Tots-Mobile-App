import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DashboardOption = (props) => {
  return (
    <TouchableOpacity style={style.option}>
      <Text style={style.text}>{props.data.option.name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  option: {
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 10,
    alignSelf: "stretch",
    margin: 5,
    elivate: 1,
  },
  text: {
    width: "90%",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default DashboardOption;
