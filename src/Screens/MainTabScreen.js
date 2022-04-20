import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import ExploreScreen from "./ExploreScreen";
import SearchScreen from "./SearchScreen";
import MapTestScreen from "./MapTestScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardListScreen from "./CardListScreen";
import CardItemDetails from "./CardItemDetails";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#004c97",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarLabel: "Search",
        tabBarColor: "#004c99",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Vendors"
      component={SearchScreen}
      options={{
        tabBarLabel: "Vendors",
        tabBarColor: "#004c99",
        tabBarIcon: ({ color }) => (
          <Entypo name="shop" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Offers"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: "Offers",
        tabBarColor: "#004c99",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="sale" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#004c99",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker-radius" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#333",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name=" "
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Icon.Button
              name="ios-menu"
              size={25}
              color="#333"
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bangalore</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
    <HomeStack.Screen
      name="CardListScreen"
      component={CardListScreen}
      options={({ route }) => ({
        title: route.params.title,
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bangalore</Text>
            </TouchableOpacity>
          </View>
        ),
      })}
    />
    <HomeStack.Screen
      name="CardItemDetails"
      component={CardItemDetails}
      options={({ route }) => ({
        // title: route.params.title,
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: "#fff",
      })}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#333",
    }}
  >
    <DetailsStack.Screen
      name=" "
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            color="#333"
            size={25}
            backgroundColor="#fff"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);
