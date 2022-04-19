import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const FavouriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavouriteScreen</Text>
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

export default FavouriteScreen;
