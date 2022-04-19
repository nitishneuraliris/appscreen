import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./src/Screens/MainTabScreen";

import { DrawerContent } from "./src/Screens/DrawerContent";
import SettingScreen from "./src/Screens/SettingScreen";
import AssistanceScreen from "./src/Screens/AssistanceScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import BookmarkScreen from "./src/Screens/BookmarkScreen";
import FavouriteScreen from "./src/Screens/FavouriteScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SettingScreen" component={SettingScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="AssistanceScreen" component={AssistanceScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        <Drawer.Screen name="FavouriteScreen" component={FavouriteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
