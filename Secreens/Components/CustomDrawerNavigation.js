import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../../assets/atss_logo.png";
import RNRestart from "react-native-restart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerNavigation = ({ navigation }) => {
  async function logOut() {
    await AsyncStorage.clear();
    RNRestart.Restart();
  }

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={styles.headerName}>
        <Text style={{ color: "white", fontSize: 20, marginTop: "8%" }}>
          Menu
        </Text>
      </View>
      <View style={styles.headerStyle}>
        <Image source={logo} style={{ width: "84%", height: "42%" }} />
      </View>

      <View
        style={{
          borderTopWidth: 0.5,
          borderLeftRadius: 1,
          borderTopColor: "#0047AB",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Icon name="home" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Dashboard</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate("Update details")}
        >
          <Icon name="edit" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Update details</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate("Register child")}
        >
          <Icon name="child" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Register child</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate("Dependents")}
        >
          <Icon name="child" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Dependents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="user" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationItem}
          onPress={async () => {
            // await AsyncStorage.clear();
            logOut();
          }}
        >
          <Icon name="sign-out" size={24} color="#002f67" />
          <Text style={styles.navigationText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationItem: {
    width: "100%",
    backgroundColor: "#FFFFF",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    alignItems: "flex-start",
    // borderBottomWidth: 1,
    flexDirection: "row",
    // borderTopWidth: 1,
    borderColor: "#0047AB",
  },
  navigationText: {
    color: "#0047AB",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  headerStyle: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerName: {
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#3D75C3",
  },
});

export default CustomDrawerNavigation;
