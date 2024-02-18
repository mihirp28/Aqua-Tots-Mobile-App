import React, { useEffect, useState } from "react";
import WeekView from "react-native-week-view";
import { GetRequest } from "../../Helper/Requests";
import { getLocation, getUniqueKey } from "../../Helper/Storages";
import { LoadingHighlight } from "./Loading";
import { Text, View, Alert } from "react-native";
import axios from "axios";

// cancel class
async function cancelClass(event) {
  let visitsAfterCancel = [];
  await axios
    .delete(
      "https://atss-" +
        (await getLocation()) +
        ".pike13.com/api/v2/front/visits/" +
        event.id
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Show event details in alert
function eventDetails(event) {
  Alert.alert(
    event.description,

    event.startDate.getMonth() +
      1 +
      "-" +
      event.startDate.getDate() +
      "-" +
      event.startDate.getFullYear() +
      "(" +
      event.startDate.getHours() +
      ":" +
      event.startDate.getMinutes() +
      " to " +
      event.endDate.getHours() +
      ":" +
      event.endDate.getMinutes() +
      ")",
    [
      {
        text: "Cancel class",
        onPress: () => {
          console.log(event.id);
        },
      },
      { text: "OK" },
    ]
  );
  // console.log(event);
}

function Schedule(props) {
  //   console.log(props);

  // const [visits, setVisits] = useState("");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  let visits = [];
  const childDetails = props.route.params.childDetails;
  // console.log(events);

  let localDate = new Date(); // getting current date
  // console.log(
  //   localDate.getFullYear() +
  //     " " +
  //     (localDate.getMonth() + 1) +
  //     " " +
  //     localDate.getDate()
  // );

  // get all visits
  async function getVisits() {
    try {
      data = await GetRequest(
        "https://atss-" +
          (await getLocation()) +
          ".pike13.com/api/v2/front/people/" +
          childDetails.id +
          "/visits",
        { Authorization: "Bearer " + (await getUniqueKey()) }
      );
    } catch (e) {
      console.log(e);
    }

    // setVisits(data.visits);
    // let i = 1;
    data.visits.map((visit) => {
      const fullStartDate = visit.event_occurrence.start_at;
      const fullEndDate = visit.event_occurrence.end_at;

      // console.log(fullStartDate);
      // console.log(endDate);

      const startDateYear = parseInt(fullStartDate.substring(0, 4));
      const startDateMonth = parseInt(fullStartDate.substring(5, 7));
      const startDate = parseInt(fullStartDate.substring(8, 10));
      const startDateStartTime = parseInt(fullStartDate.substring(11, 13));
      const startDateEndTime = parseInt(fullStartDate.substring(14, 16));

      const endDateYear = parseInt(fullEndDate.substring(0, 4));
      const endDateMonth = parseInt(fullEndDate.substring(5, 7));
      const endDate = parseInt(fullEndDate.substring(8, 10));
      const endDateStartTime = parseInt(fullEndDate.substring(11, 13));
      const endDateEndTime = parseInt(fullEndDate.substring(14, 16));

      // console.log(
      //   startDate +
      //     " " +
      //     startDateMonth +
      //     " " +
      //     startDateYear +
      //     " " +
      //     startDateStartTime +
      //     " " +
      //     startDateEndTime
      // );
      // console.log(
      //   endDate +
      //     " " +
      //     endDateMonth +
      //     " " +
      //     endDateYear +
      //     " " +
      //     endDateStartTime +
      //     " " +
      //     endDateEndTime
      // );

      // console.log(startDateYear);

      visits.push({
        id: visit.id,
        description: visit.event_occurrence.name,
        startDate: new Date(
          startDateYear,
          startDateMonth - 1,
          startDate,
          startDateStartTime,
          startDateEndTime
        ),
        endDate: new Date(
          endDateYear,
          endDateMonth - 1,
          endDate,
          endDateStartTime,
          endDateEndTime
        ),
        color: "#3D75C3",
      });

      // i = i + 1;
    });
    setEvents(visits); // Set all the events
    setLoading(false);
  }

  useEffect(() => {
    getVisits();
  }, []);

  return (
    <>
      {loading ? <LoadingHighlight /> : null}

      {events.length > 0 ? (
        <WeekView
          headerStyle={{ backgroundColor: "#0047AB" }}
          headerTextStyle={{ color: "white" }}
          hourTextStyle={{ color: "black" }}
          eventContainerStyle={{
            borderRadius: 5,
            borderColor: "white",
            borderWidth: 1,
          }}
          gridColumnStyle={{ borderWidth: 0.01, borderColor: "#D3D3D3" }}
          gridRowStyle={{ borderWidth: 0.01, borderColor: "#D3D3D3" }}
          showNowLine={true}
          nowLineColor="red"
          events={events} // All events
          timeStep={30}
          selectedDate={
            new Date(
              parseInt(localDate.getFullYear()),
              parseInt(localDate.getMonth()),
              parseInt(localDate.getDate())
            )
          }
          numberOfDays={3}
          startHour={localDate.getHours()}
          onEventPress={(event) => {
            eventDetails(event);
          }}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 20, color: "#0047AB" }}>
            No class scheduled
          </Text>
        </View>
      )}
    </>
  );
}

export default Schedule;
