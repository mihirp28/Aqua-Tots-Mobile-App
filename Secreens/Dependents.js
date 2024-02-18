import React, { useEffect, useState } from "react";
import { GetRequest } from "../Helper/Requests";
import { getLocation, getUniqueKey } from "../Helper/Storages";
import { LoadingHighlight } from "./Components/Loading";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import DependentCard from "./Components/DependentCard";
import { RegisterChildImg } from "../assets/images";

function Dependents({ navigation }) {
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
    <View style={{ height: "100%" }}>
      {loading === true ? <LoadingHighlight /> : null}
      <View
        style={{
          height: "100%",
        }}
      >
        <ScrollView style={{ width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <View style={style.logo}>
              <RegisterChildImg />
            </View>
            <View style={{ marginTop: "5%" }}>
              {dependents.length > 0 ? (
                dependents.map((dep) => {
                  return (
                    <DependentCard
                      key={dep.id}
                      details={dep}
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
          </View>
        </ScrollView>
      </View>
      {/* <View style={style.addDependentPosition}>
        <TouchableOpacity
          style={style.addDependent}
          onPress={() => {
            navigation.push("Register child");
          }}
        >
          <Text style={style.dependentText}>ADD DEPENDENT</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const style = StyleSheet.create({
  logo: {
    paddingTop: "10%",
    alignItems: "center",
    paddingBottom: "10%",
  },
  addDependent: {
    flex: 1,
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
  addDependentPosition: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dependentText: { fontSize: 20, color: "white" },
});

export default Dependents;
