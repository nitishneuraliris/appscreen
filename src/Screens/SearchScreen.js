import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Text>SearchScreen</Text>
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

export default SearchScreen;
