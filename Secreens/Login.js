import React, { useEffect, useState } from "react";
import { Alert, LogBox, BackHandler } from "react-native";
import Loading, { LoadingHighlight } from "./Components/Loading";
import { WebView } from "react-native-webview";
import {
  setIsLoggedin,
  setUniqueKey,
  getUniqueKey,
  setLocation,
} from "../Helper/Storages";
import RNRestart from "react-native-restart";
import axios from "axios";

// Set unique authentication code
const setAuthCode = async (code) => {
  await axios
    .post(
      `https://pike13.com/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:60295/callback&client_id=IXyw9UlNoe8Z3zLzlHZh8bPJcbjaSeOr87cv1d2c&client_secret=lkDzg3iHDj3jRGJjXc5rv4bWc7sVsVdN7oOmHzwP`
    )
    .then(async (res) => {
      // console.log(res.data.access_token);
      await setUniqueKey(res.data.access_token);
    })
    .catch((e) => {
      console.log(e);
    });
};

function Login(props) {
  const navigation = props.route.params.navigation;
  useEffect(() => {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
    LogBox.ignoreLogs(["Can't open url: mailto:cypressinfo@aqua-tots.com"]);
    LogBox.ignoreLogs(["Can't open url: tel://2813105777"]);
  }, []);

  const [loaded, setLoaded] = useState(false);
  const [uri, setUri] = useState(
    "https://atss-" +
      props.route.params.location +
      ".pike13.com/oauth/authorize?client_id=IXyw9UlNoe8Z3zLzlHZh8bPJcbjaSeOr87cv1d2c&response_type=code&redirect_uri=http://localhost:60295/callback"
  );

  return (
    <>
      {loaded === false ? <LoadingHighlight /> : null}

      <WebView
        javaScriptEnabled={true}
        // injectedJavaScript={""}
        style={{ marginTop: "-4%" }}
        source={{
          uri: uri,
        }}
        onError={() => {
          console.log("error");
          navigation.navigate("Select location");
        }}
        onLoadStart={() => {
          setLoaded(false);
        }}
        onLoadEnd={() => {
          setLoaded(true);
        }}
        onNavigationStateChange={async (webViewState) => {
          // console.log(webViewState.url);
          // console.log();

          if (webViewState.url.includes("code=")) {
            try {
              const url = webViewState.url;
              // navigation.replace("Dashboard");
              // setLoaded(false);

              const urlArray = url.split("code=");
              const codes = urlArray[1].split("&");
              const uniqueKey = codes[0];

              await setAuthCode(uniqueKey); // Set unique key
              await setLocation(props.route.params.location);
              // console.log(await getUniqueKey());

              await setIsLoggedin("true");
              if (uniqueKey !== "") {
                Alert.alert("You have logged in successfully");
              }
              RNRestart.Restart();
            } catch (exception) {}
          }
        }}
      />
    </>
  );
}

export default Login;

// support@xcallisto.com
// AaryaShreya123
