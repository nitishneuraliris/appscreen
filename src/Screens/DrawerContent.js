import React, { useState } from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

import { LocalApiUrl } from "../../Constant";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerContent(props) {
  const [isAPILoading, setSignOut] = useState(false);

  const handleSignOutWithOutApi = () => {
    props.navigation.navigate("SignOut");
  };
  const handleSignOut = async () => {
    setSignOut(true);
    let Access_token = await AsyncStorage.getItem("Access_token");
    axios
      .post(
        `${LocalApiUrl}/user_logout`,
        {},
        {
          headers: {
            Authorization: "Bearer " + Access_token,
          },
        }
      )
      .then(async (res) => {
        setSignOut(false);

        await AsyncStorage.removeItem("Access_token");
        props.navigation.navigate("SignOut");
      })
      .catch(function (error) {
        setSignOut(false);
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isAPILoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Nitish Kumar</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-outline" color={color} size={size} />
              )}
              label="Appointments"
              onPress={() => {
                props.navigation.navigate("BookmarkScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="heart-outline" color={color} size={size} />
              )}
              label="Favourites"
              onPress={() => {
                props.navigation.navigate("FavouriteScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("SettingScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("AssistanceScreen");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleSignOutWithOutApi}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
