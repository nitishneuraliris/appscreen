import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { data } from "../../model/data";
import Card from "../../components/Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const CardListScreen = ({ navigation }) => {
  const initialMapState = {
    categories: [
      {
        name: "Fastfood Center",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
      },
      {
        name: "Restaurant",
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        name: "Dineouts",
        icon: (
          <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        name: "Snacks Corner",
        icon: (
          <MaterialCommunityIcons
            name="food"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
      {
        name: "Hotel",
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
  };
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("CardItemDetails", { itemData: item })
        }
      />
    );
  };

  const [state, setState] = React.useState(initialMapState);

  return (
    <View style={styles.container1}>
      <View style={styles.categoryContainer}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0 }}
          />
          <Ionicons name="ios-search" size={20} />
        </View>
        <View>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
          >
            {state.categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.chipsItem}>
                {category.icon}
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.cardsWrapper}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff",
    flex: 1,
  },
  categoryContainer: {
    width: "100%",
    marginBottom: "25%",
  },
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  cardsWrapper: {
    width: "90%",
    alignSelf: "center",
    marginTop: StatusBar.currentHeight + 7,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 10 : 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
