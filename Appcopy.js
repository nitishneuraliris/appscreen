import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabScreen from "./src/Screens/MainTabScreen";

import { DrawerContent } from "./src/Screens/DrawerContent";
import SettingScreen from "./src/Screens/SettingScreen";
import AssistanceScreen from "./src/Screens/AssistanceScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import BookmarkScreen from "./src/Screens/BookmarkScreen";
import FavouriteScreen from "./src/Screens/FavouriteScreen";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import RootStackScreen from "./src/Screens/RootStackScreen";
import HomeDrawerScreen from "./src/Screens/HomeDrawerScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AsyncStorage } from "react-native";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const App = () => {
  const [Login, setLogin] = useState(false);
  const fetchLoginStatus = async () => {
    let token = await AsyncStorage.getItem("Access_token");
    if (token) {
      setLogin(true);
    }
  };

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator headerMode="none" initialRouteName={"SignIn"}>
            <RootStack.Screen name="SignIn" component={SignIn} />
            <RootStack.Screen name="SignUp" component={SignUp} />
            <RootStack.Screen
              name="HomeDrawerScreen"
              component={HomeDrawerScreen}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;

