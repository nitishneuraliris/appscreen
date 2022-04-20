import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StarRating from "../../components/StarRating";

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
     {/*  <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} translucent /> */}
      <View style={styles.sliderContainer}>
        <Swiper autoplay height={200} activeDotColor="#004c99">
          <View style={styles.slide}>
            <Image
              source={require("../../assets/banners/food-banner1.jpg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../assets/banners/food-banner2.jpg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../assets/banners/food-banner3.jpg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate("CardListScreen", { title: " " })}
        >
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-restaurant" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate("CardListScreen", { title: " " })}
        >
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-restaurant" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={25}
              color="#fff"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="food" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, { marginTop: 10 }]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={25} color="#fff" />
          </View>
          <Text style={styles.categoryBtnTxt}>Show More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Recently Viewed
        </Text>

        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../../assets/banners/food-banner2.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
              <Text style={styles.cardDetails}>Timings: 12:00 - 13:00</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../../assets/banners/food-banner3.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../../assets/banners/food-banner4.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    backgroundColor: "#ff5757" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 10,
    color: "#de4f35",
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 150,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1.5,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    padding: 2,
    fontSize: 12,
    color: "#444",
  },
});
