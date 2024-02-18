import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function DependentScheduleCard(props) {
  const navigation = props.navigation;
  const childDetails = props.childDetails;

  return (
    <>
      <View style={style.cardStyle}>
        <View style={{ width: "75%" }}>
          <Text style={{ fontSize: 20, color: "#0047AB" }}>
            {childDetails.first_name}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            width: "20%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.push("Schedule", { childDetails });
            }}
          >
            <Icon
              name="calendar"
              size={24}
              color="#002f67"
              style={{ marginLeft: 20, paddingRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default DependentScheduleCard;

const style = StyleSheet.create({
  cardStyle: {
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
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

    elevation: 2,
  },
});
