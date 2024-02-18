import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { RegisterChildImg } from "../assets/images";
import { GetRequest } from "../Helper/Requests";
import { getLocation, getUniqueKey } from "../Helper/Storages";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const RegisterChild = ({ navigation }) => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState("");

  const [fnameValid, setFnameValid] = useState();
  const [mnameValid, setMnameValid] = useState();
  const [lnameValid, setLnameValid] = useState();
  const [emailValid, setEmailValid] = useState();
  const [phoneValid, setPhoneValid] = useState();
  const [dateDisplay, setDateDisplay] = useState(false);

  // Get details of user
  async function getUserDetails() {
    const data = await GetRequest(
      "https://atss-" +
        (await getLocation()) +
        ".pike13.com/api/v2/front/people/me",
      {
        Authorization: "Bearer " + (await getUniqueKey()),
      }
    );
    // console.log(await getUniqueKey());
    console.log(data);
    return data;
  }

  // Register Child
  async function registerChildDetails() {
    // await axios
    //   .post(
    //     "https://atss-" +
    //       (await getLocation()) +
    //       ".pike13.com/api/v2/desk/people",
    //     {
    //       person: {
    //         // body
    //         first_name: fname,
    //         middle_name: mname,
    //         last_name: lname,
    //         email: email,
    //         phone: phone,
    //         birthdate: dob,
    //         provider_ids: "9571239",
    //       },
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer tDMcKOeFRUDIktpbuMCEe349QtZwh7LlYtcaIfwS",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(async (error) => {
    //     console.log(error);
    //   });
    // let headersList = {
    //   Accept: "*/*",
    //   Authorization: "Bearer tDMcKOeFRUDIktpbuMCEe349QtZwh7LlYtcaIfwS",
    //   "Content-Type": "application/json",
    // };
    // let bodyContent = JSON.stringify({
    //   person: {
    //     first_name: "Divyesh Child 4",
    //     last_name: "Test 3",
    //     provider_ids: "9571239",
    //   },
    // });
    // await fetch("https://atss-cypress.pike13.com/api/v2/desk/people", {
    //   method: "POST",
    //   body: bodyContent,
    //   headers: headersList,
    // })
    //   .then(function (response) {
    //     return response.text();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //   });
  }

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  useEffect(() => {
    console.log(getUserDetails());
  }, []);

  const firstNameValidation = (fname) => {
    fNameRegex = /[^A-Za-z]/;
    setFname(fname);
    if ((fname.length < 2) | fNameRegex.test(fname)) {
      setFnameValid(false);
    } else {
      setFnameValid(true);
    }
  };

  const middleNameValidation = (mname) => {
    mNameRegex = /[^A-Za-z]/;
    setMname(mname);
    if ((mname.length < 2) | mNameRegex.test(mname)) {
      setMnameValid(false);
    } else {
      setMnameValid(true);
    }
  };

  const lastNameValidation = (lname) => {
    lNameRegex = /[^A-Za-z]/;
    setLname(lname);
    if ((lname.length < 2) | lNameRegex.test(lname)) {
      setLnameValid(false);
    } else {
      setLnameValid(true);
    }
  };

  const emailValidation = (email) => {
    setEmail(email);
    if (!emailRegex.test(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const phoneValidation = (phone) => {
    setPhone(phone);
    if (!phoneRegex.test(phone)) {
      setPhoneValid(false);
    } else {
      setPhoneValid(true);
    }
  };

  const dobChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // console.log(
    //   currentDate.getMonth() +
    //     "/" +
    //     currentDate.getDate() +
    //     "/" +
    //     currentDate.getFullYear()
    // );
    setDateDisplay(false);
    setDob(
      currentDate.getMonth() +
        "/" +
        currentDate.getDate() +
        "/" +
        currentDate.getFullYear()
    );
    setDate(currentDate);
  };

  return (
    <>
      <View style={{ height: "100%", backgroundColor: "white" }}>
        <ScrollView>
          <View style={style.logo}>
            <RegisterChildImg />
          </View>
          <View style={{ alignItems: "center", marginTop: "5%" }}>
            <TextInput
              style={style.input}
              placeholder="First name"
              placeholderTextColor="grey"
              autoFocus
              onChangeText={(fname) => {
                firstNameValidation(fname);
              }}
            />

            {fnameValid === false ? (
              <Text style={{ color: "red" }}>Enter valid first name</Text>
            ) : null}

            <TextInput
              style={style.input}
              placeholder="Middle name"
              placeholderTextColor="grey"
              onChangeText={(mname) => {
                middleNameValidation(mname);
              }}
            />

            {mnameValid === false ? (
              <Text style={{ color: "red" }}>Enter valid middle name</Text>
            ) : null}

            <TextInput
              style={style.input}
              placeholder="Last name"
              placeholderTextColor="grey"
              onChangeText={(lname) => {
                lastNameValidation(lname);
              }}
            />

            {lnameValid === false ? (
              <Text style={{ color: "red" }}>Enter valid last name</Text>
            ) : null}

            <TextInput
              style={style.input}
              placeholder="Email address"
              placeholderTextColor="grey"
              onChangeText={(email) => {
                emailValidation(email);
              }}
            />

            {emailValid === false ? (
              <Text style={{ color: "red" }}>Enter valid email</Text>
            ) : null}

            <TextInput
              style={style.input}
              placeholder="Phone number"
              placeholderTextColor="grey"
              onChangeText={(phone) => {
                phoneValidation(phone);
              }}
            />

            {phoneValid === false ? (
              <Text style={{ color: "red" }}>Enter valid phone number</Text>
            ) : null}

            <TouchableOpacity
              style={style.dob}
              onPress={() => {
                dateDisplay === true
                  ? setDateDisplay(false)
                  : setDateDisplay(true);
              }}
            >
              <View style={{ width: "80%", marginLeft: "0%" }}>
                <Text style={{ fontSize: 20, color: "grey" }}>
                  Date of birth: <Text style={{ color: "#0047AB" }}>{dob}</Text>
                </Text>
              </View>
              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Icon
                  name="calendar"
                  // style={{ marginRight: "5%" }}
                  size={30}
                  color="#002f67"
                />
              </View>
            </TouchableOpacity>
            {dateDisplay === true ? (
              <DateTimePicker value={date} onChange={dobChange} />
            ) : null}

            <TouchableOpacity
              style={style.register}
              onPress={() => {
                if (
                  fnameValid !== true ||
                  mnameValid !== true ||
                  lnameValid !== true ||
                  emailValid !== true ||
                  phoneValid !== true ||
                  dob === ""
                ) {
                  Alert.alert("Please enter valid details");
                } else {
                  registerChildDetails();
                }
              }}
            >
              <Text style={style.registerText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterChild;

const style = StyleSheet.create({
  logo: {
    marginTop: "5%",
    alignItems: "center",
    paddingBottom: 0,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#0047AB",
    fontSize: 20,
    marginTop: "2%",
    marginBottom: "2%",
    color: "#0047AB",
    backgroundColor: "white",
  },
  dob: {
    width: "80%",
    flex: 1,
    backgroundColor: "white",
    padding: "1.5%",
    marginTop: "5%",
    flexDirection: "row",
    // alignItems: "center",
    shadowColor: "#000",
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#0047AB",
  },
  register: {
    width: "80%",
    backgroundColor: "#0047AB",
    padding: "3%",
    marginTop: "7%",
    alignItems: "center",
    shadowColor: "#000",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.0,
    elevation: 10,
  },
  registerText: {
    color: "white",
    fontSize: 20,
  },
});
