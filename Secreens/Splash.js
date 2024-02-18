import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/atss_logo.png";
import { getIsLoggedin } from "../Helper/Storages";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      let loggedIn = await getIsLoggedin();
      if (loggedIn !== "true") {
        navigation.replace("Select location");
      } else {
        navigation.replace("Dashboard");
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.image}>
      <Image source={logo} resizeMode="cover"></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0047AB",
  },
});

export default Splash;
