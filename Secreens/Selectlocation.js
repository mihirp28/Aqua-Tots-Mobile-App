import React, { useEffect, useState } from "react";
import { LocationImg } from "../assets/images";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import logo from "../assets/atss_logo.png";
import Location from "./Components/Location";
import { GetRequest } from "../Helper/Requests";
import Loading, { LoadingHighlight } from "./Components/Loading";

const Selectlocation = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
  }, []);

  // get all locations from API
  async function getLocations() {
    let locationsDetails = [];
    const response = await GetRequest(
      "https://pike13.com/api/v2/account/businesses",
      {
        Authorization: "Bearer tDMcKOeFRUDIktpbuMCEe349QtZwh7LlYtcaIfwS",
      }
    );
    response.businesses.map((location) => {
      let fullLocationName = location.name;
      let names = fullLocationName.split("Schools - ");
      let locationName = names[1]; // Location name

      let locationValue = "";
      let locationArrayAfterSpace = locationName.split(" ");
      locationArrayAfterSpace.map((subLocationName) => {
        locationValue += subLocationName; // Location value without spaces
      });

      locationsDetails.push({ name: locationName, value: locationValue });
    });

    setLocations(locationsDetails);
  }

  return (
    <>
      {locations.length === 0 ? <LoadingHighlight /> : null}
      <View style={style.locationScreen}>
        <View style={style.topSection}>
          <Image source={logo} style={style.logo} />
          <View style={{ marginTop: "10%" }}>
            <LocationImg />
          </View>
        </View>

        <ScrollView persistentScrollbar={true}>
          <View style={style.locations}>
            {locations.map((loc, index) => {
              return (
                <Location
                  key={index}
                  data={{ name: loc.name, value: loc.value, navigation }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  topSection: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  logo: {
    marginBottom: "2%",
    width: "75%",
    resizeMode: "contain",
    marginTop: "5%",
  },
  locationScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  locationFont: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: "2%",
    color: "#0047AB",
  },
  locations: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // alignItems: "center",
    justifyContent: "center",
    // marginTop: "7%",
  },
});

export default Selectlocation;
