import React, { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { DashboardImg, ChatImg } from "../assets/images";
import { GetRequest } from "../Helper/Requests";
import Icon from "react-native-vector-icons/FontAwesome";

// import DashboardOption from "./Components/DashboardOption";

const Dashboard = ({ navigation }) => {
  // const dashboardOptions = [
  //   { name: "View/Manage schedule" },
  //   { name: "View progress" },
  //   { name: "Create new recurring enrollment" },
  //   { name: "Communicate with swim school" },
  // ];

  useEffect(() => {
    // On back button press exit from app
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
    });
  }, []);

  return (
    <View style={style.dashboardScreen}>
      <ScrollView>
        <View style={style.topSection}>
          <View style={style.logo}>
            <DashboardImg />
          </View>
        </View>
        {/* <Text style={style.dashboardText}>Select option</Text> */}

        <View
          style={{
            width: "100%",
            height: "100%", // could be changed
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10%",
            marginBottom: "10%", // could be changed
          }}
        >
          {/* {dashboardOptions.map((option, index) => {
            return (
              <DashboardOption key={index} data={{ option, navigation }} />
            );
          })} */}

          <TouchableOpacity
            style={style.option}
            onPress={() => {
              navigation.push("View/Manage schedule");
            }}
          >
            <View>
              <Icon name="calendar" size={30} color="#002f67" />
            </View>
            <Text style={style.optionText}>View/Manage schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.option}
            onPress={() => {
              navigation.push("View plans");
            }}
          >
            <View>
              <Icon name="clipboard" size={30} color="#002f67" />
            </View>
            <Text style={style.optionText}>View plans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.option}>
            <View>
              <Icon name="bar-chart" size={30} color="#002f67" />
            </View>
            <Text style={style.optionText}>View progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.option}
            onPress={() => {
              navigation.push("Message");
            }}
          >
            <View>
              <Icon name="wechat" size={30} color="#002f67" />
            </View>
            <Text style={style.optionText}>Message swim school</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  topSection: {
    backgroundColor: "#0047AB",
    width: "100%",
    alignItems: "center",
    paddingBottom: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,

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
    // alignItems: "center",
    backgroundColor: "white",
  },
  dashboardText: {
    color: "#0047AB",
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    alignSelf: "stretch",
    margin: 5,
    shadowColor: "#0047AB",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  chatOption: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    alignSelf: "stretch",
    margin: 5,
    shadowColor: "#0047AB",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  optionText: {
    width: "90%",
    color: "#0047AB",
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 20,
  },
});
export default Dashboard;
