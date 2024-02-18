import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { UpdateDetailsImage } from "../assets/images";

const UpdateDetails = () => {
  return (
    <View>
      <View style={style.dashboardScreen}>
        <View style={style.topSection}>
          <View style={style.logo}>
            <UpdateDetailsImage />
          </View>
        </View>
      </View>
      {/* <ScrollView> */}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: "10%",
        }}
      >
        <TouchableOpacity style={style.option}>
          <Text style={style.optionText}>Update child's information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.option}>
          <Text style={style.optionText}>Update guardian's information</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default UpdateDetails;

const style = StyleSheet.create({
  topSection: {
    backgroundColor: "#0047AB",
    width: "100%",
    alignItems: "center",
    paddingBottom: "5%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logo: {
    marginBottom: "10%",
    width: "75%",
    resizeMode: "contain",
    marginTop: "15%",
    alignItems: "center",
  },
  dashboardScreen: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  option: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    alignSelf: "stretch",
    marginTop: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.0,
    elevation: 10,
  },
  optionText: {
    width: "90%",
    color: "#0047AB",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
