import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { getLocation, getUniqueKey } from "../../Helper/Storages";
import { GetRequest } from "../../Helper/Requests";
import Loading, { LoadingHighlight } from "./Loading";
import { PlanImg } from "../../assets/images";

function planCard(plan) {
  return (
    <View key={plan.id}>
      <View style={{ alignItems: "center", marginTop: "5%" }} key={plan.id}>
        <View style={style.card}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {plan.name}
            </Text>
          </View>
          <Text style={style.textStyle}>Description - {plan.description}</Text>
          <Text style={style.textStyle}>Start date - {plan.start_date}</Text>
          <Text style={style.textStyle}>End date - {plan.end_date}</Text>
        </View>
      </View>
    </View>
  );
}

function Plan(props) {
  const [loading, setLoading] = useState(true);
  const childDetails = props.route.params.childDetails;
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getPlanDetails(childDetails);
  }, []);

  // Fetch plans of a child
  async function getPlanDetails(child) {
    try {
      const data = await GetRequest(
        "https://atss-" +
          (await getLocation()) +
          ".pike13.com/api/v2/front/people/" +
          child.id +
          "/plans",
        { Authorization: "Bearer " + (await getUniqueKey()) }
      );
      //   console.log(data);
      setPlans(data.plans);
      //   console.log(plans);
    } catch (exception) {
      console.log(exception);
    }

    setLoading(false);
  }

  return (
    <>
      {loading ? <LoadingHighlight /> : null}
      <View>
        <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
          <View style={style.logo}>
            <PlanImg />
          </View>
          <View style={style.nameStyle}>
            <Text
              style={{ color: "#0047AB", fontSize: 20, fontWeight: "bold" }}
            >
              {childDetails.name}, Plans ({childDetails.id})
            </Text>
          </View>
          {plans.length > 0 ? (
            plans.map((plan) => {
              return planCard(plan);
            })
          ) : (
            <View
              style={{
                alignItems: "center",
                // height: "0%",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "#0047AB" }}>
                No plans added
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

export default Plan;

const style = StyleSheet.create({
  logo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  nameStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    // borderBottomWidth: 1,
    borderBottomColor: "#0047AB",
  },
  card: {
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderTopColor: "#0047AB",
    marginTop: "4%",
    marginBottom: "5%",
    width: "90%",
    // height: "15%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  textStyle: {
    color: "#0047AB",
  },
});
