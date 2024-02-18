import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SchdeuleImg } from "../assets/images";
import { GetRequest } from "../Helper/Requests";
import { getLocation, getUniqueKey } from "../Helper/Storages";
import DependentScheduleCard from "./Components/DependentScheduleCard";
import { LoadingHighlight } from "./Components/Loading";

function SelectDependent({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [dependents, setDependents] = useState([]);
  let data = null;

  // fetching all dependents
  async function getDependents() {
    try {
      data = await GetRequest(
        "https://atss-" +
          (await getLocation()) +
          ".pike13.com/api/v2/front/people/me?with_dependents=true",
        { Authorization: "Bearer " + (await getUniqueKey()) }
      );
      setDependents(data.people[0].dependents);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  // console.log(dependents);

  useEffect(() => {
    getDependents();
  }, []);

  return (
    <>
      {loading ? <LoadingHighlight /> : null}
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={style.logo}>
          <SchdeuleImg />
        </View>
        <View style={style.dependents}>
          {dependents.length > 0 ? (
            dependents.map((dep) => {
              return (
                <DependentScheduleCard
                  key={dep.id}
                  childDetails={dep}
                  navigation={navigation}
                />
              );
            })
          ) : (
            <Text style={{ fontSize: 20, color: "#0047AB" }}>
              No dependents added
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default SelectDependent;

const style = StyleSheet.create({
  logo: {
    marginTop: "10%",
    alignItems: "center",
    paddingBottom: 0,
  },
  dependents: {
    alignItems: "center",
    marginTop: "5%",
  },
});
