import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, View, SafeAreaView, StatusBar } from "react-native";
import "react-native-gesture-handler";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import Login from "./Secreens/Login";
import Selectlocation from "./Secreens/Selectlocation";
import Dashboard from "./Secreens/Dashboard";
import Splash from "./Secreens/Splash";

import { getIsLoggedin, setIsLoggedin } from "./Helper/Storages";
import Loading from "./Secreens/Components/Loading";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterChild from "./Secreens/RegisterChild";
import UpdateDetails from "./Secreens/UpdateDetails";
import CustomDrawerNavigation from "./Secreens/Components/CustomDrawerNavigation";
import SplashScreen from "react-native-splash-screen";
import ProfilePage from "./Secreens/Profile";
import Dependents from "./Secreens/Dependents";
import SelectDependent from "./Secreens/ViewSchedule";
import DependentProfile from "./Secreens/Components/DependentProfile";
import Schedule from "./Secreens/Components/Schedule";
import ViewPlans from "./Secreens/ViewPlans";
import Plan from "./Secreens/Components/Plan";
import Message from "./Secreens/Message";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const isLoggedin = async () => {
//   let loggedIn = await getIsLoggedin();
//   return loggedIn;
// };

// Stack navigation
const NavigationStack = () => {
  useEffect(() => {
    isLoggedin();
  }, []);

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState("");

  const drawerNavigationStyle = {
    headerShown: true,
    animationEnabled: true,
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    // drawerPosition: "right",

    headerStyle: {
      backgroundColor: "#002f67", // 0047AB
      borderWidth: 0,
      borderBottomColor: "white",
      elevation: 0,
    },
  };

  const stackNavigationStylde = {
    headerShown: true,
    animationEnabled: true,
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    // drawerPosition: "right",

    headerStyle: {
      backgroundColor: "#002f67",
      borderWidth: 0,
      borderBottomColor: "white",
      elevation: 0,
    },
  };
  // Drawer Navigation
  const DrawerNavigation = () => {
    return (
      <Drawer.Navigator
        screenOptions={drawerNavigationStyle}
        drawerContent={(props) => <CustomDrawerNavigation {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Update details" component={UpdateDetails} />
        <Drawer.Screen name="Dependents" component={Dependents} />
        <Drawer.Screen name="Register child" component={RegisterChild} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
      </Drawer.Navigator>
    );
  };

  // Authentication stack
  const AuthStack = () => {
    return (
      <>
        <Stack.Navigator screenOptions={stackNavigationStylde}>
          <Stack.Screen name="Select location" component={Selectlocation} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </>
    );
  };

  // Dashboard stack
  const DashboardStack = ({ navigation }) => {
    return (
      <>
        <Stack.Navigator
          initialRouteName="Drawer"
          screenOptions={drawerNavigationStyle}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Drawer"
            component={DrawerNavigation}
          />
          <Stack.Screen
            options={
              {
                // headerLeft: () => null,
              }
            }
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen name="Register child" component={RegisterChild} />
          <Stack.Screen
            name="View/Manage schedule"
            component={SelectDependent}
          />
          <Stack.Screen name="Dependent profile" component={DependentProfile} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="View plans" component={ViewPlans} />
          <Stack.Screen name="Plans" component={Plan} />
          <Stack.Screen name="Message" component={Message} />
        </Stack.Navigator>
      </>
    );
  };

  async function isLoggedin() {
    // setLoading(true);
    setLoggedIn(await getIsLoggedin());
    setLoading(false);
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <NavigationContainer>
            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={Splash}
            /> */}
            {loggedIn !== "true" ? <AuthStack /> : <DashboardStack />}
          </NavigationContainer>
        </>
      )}
    </>
  );
};

// Main application
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#002f67"
        translucent={true}
      />
      <View
        style={{
          backgroundColor: Colors.white,
          height: "100%",
        }}
      >
        <NavigationStack />
      </View>
    </>
  );
};

export default App;
