import React from "react";
/* import { NavigationContainer } from "@react-navigation/native"; */

import { createDrawerNavigator } from "@react-navigation/drawer";
/* import { createStackNavigator } from "@react-navigation/stack"; */
import MainTabScreen from "./MainTabScreen";

import { DrawerContent } from "./DrawerContent";
import SettingScreen from "./SettingScreen";
import AssistanceScreen from "./AssistanceScreen";
import ProfileScreen from "./ProfileScreen";
import BookmarkScreen from "./BookmarkScreen";
import FavouriteScreen from "./FavouriteScreen";
import SignIn from "./SignIn";

//Comment

const Drawer = createDrawerNavigator();

const HomeDrawerScreen = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SettingScreen" component={SettingScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="AssistanceScreen" component={AssistanceScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        <Drawer.Screen name="FavouriteScreen" component={FavouriteScreen} />
        <Drawer.Screen name="SignOut" component={SignIn} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeDrawerScreen;
