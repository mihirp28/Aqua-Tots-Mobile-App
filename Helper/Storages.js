import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setIsLoggedin(login) {
  await AsyncStorage.setItem("isLoggedin", login);
}

export async function getIsLoggedin() {
  return await AsyncStorage.getItem("isLoggedin");
}

export async function setUniqueKey(key) {
  await AsyncStorage.setItem("key", key);
}

export async function getUniqueKey() {
  return await AsyncStorage.getItem("key");
}

export async function setLocation(location) {
  await AsyncStorage.setItem("location", location);
}

export async function getLocation() {
  return await AsyncStorage.getItem("location");
}
