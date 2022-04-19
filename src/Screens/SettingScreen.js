import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingScreen;
