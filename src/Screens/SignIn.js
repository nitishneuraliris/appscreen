import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import {
  LocalApiUrl,
  regexName,
  regexemail,
  regexpassword,
} from "../../Constant";
import { ValidationMessage } from "../../ValidationMessage";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";

const SignIn = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [isAPILoading, setisAPILoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [Error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    setError({
      email: "",
      password: "",
    });
    setData({
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
    });
    setStatusMessage("");
    setisAPILoading(false);

    props.navigation.navigate("SignUp");
  };
  const handleValidation = () => {
    let valid = true;
    let d = {
      email: data.email,
      password: data.password,
    };
    const isEmpty = Object.values(d).every((x) => x === null || x === "");
    if (isEmpty) {
      setError({
        email: ValidationMessage.RequiredEmail,
        password: ValidationMessage.RequiredPassword,
      });
      valid = false;
    }
    if (
      !d.email.endsWith("@gmail.com" || d.email.length > 35) &&
      isEmpty == false
    ) {
      setError({
        ...Error,
        email: ValidationMessage.RegexEmail,
      });
      valid = false;
    }
    if (!regexpassword.test(d.password) && isEmpty == false) {
      setError({
        ...Error,
        password: ValidationMessage.RegexPassword,
      });
      valid = false;
    }
    return valid;
  };

  const textInputChange = (name, val) => {
    setStatusMessage("");
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
      setError({
        ...Error,
        email: "",
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setStatusMessage("");
    setData({
      ...data,
      password: val,
    });
    setError({
      ...Error,
      password: "",
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLoginWithOutApi = () => {
    props.navigation.navigate("HomeDrawerScreen");
  };

  const handleLogin = async () => {
    let valid = handleValidation();
    if (valid) {
      let Username = data.email.slice();
      /* setData({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
      });
      setError({
        email: "",
        password: "",
      }); */

      setisAPILoading(true);
      axios
        .post(`${LocalApiUrl}/user_login`, {
          username: Username.replace(/@.*$/, ""),
          password: data.password,
        })
        .then(async (response) => {
          setisAPILoading(false);
          if (response.data.Login) {
            await AsyncStorage.setItem(
              "Access_token",
              response.data.access_token
            );

            props.navigation.navigate("HomeDrawerScreen");
          } else {
            setStatusMessage(ValidationMessage.Login);
          }
        })
        .catch(function (error) {
          setisAPILoading(false);
          console.log(
            "There has been a problem with your fetch operation: " +
              error.message
          );
          // ADD THIS THROW error
          throw error;
        });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isAPILoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.placement}>
          <Animatable.Image
            animation="bounceIn"
            // source={require("./assets/srlogo.png")}
            style={styles.logo}
            resizeMode="center"
          />
        </View>
      </SafeAreaView>
      <View style={styles.footer}>
        <ScrollView>
          {statusMessage.length != 0 && (
            <Text style={{ color: "red" }}>{statusMessage}</Text>
          )}

          {/* Email */}

          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#004c99"
              size={15}
              style={{ top: 2 }}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.email}
              onChangeText={(val) => textInputChange("email", val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {Error.email.length != 0 && (
            <Text style={{ color: "red" }}>{Error.email}</Text>
          )}

          {/* Password */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#004c99" size={15} style={{ top: 2 }} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              value={data.password}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {Error.password.length != 0 && (
            <Text style={{ color: "red" }}>{Error.password}</Text>
          )}

          {/* Forget Password */}
          <TouchableOpacity>
            <Text style={{ color: "#009bd1", marginTop: 20, left: 5 }}>
              Forget Password ?
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handleLoginWithOutApi}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#ffffff",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  backgroundColor: "#ffffff",
                  borderColor: "#004c99",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={handleSignUp}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#004c99",
                  },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignIn;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004c99",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  placement: {
    top: 20,
    left: width * 0.05,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  footer: {
    backgroundColor: "#fff",
    width: "90%",
    left: 20,
    top: height * 0.02,
    flex: Platform.OS === "ios" ? 0.7 : 0.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    right: 20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 16,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -10,
    paddingLeft: 9,
    color: "#05375a",
    top: Platform.OS === "ios" ? 1 : 7,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#004c99",
    borderColor: "#004c99",
    borderWidth: 1,
    marginTop: Platform.OS === "ios" ? 1 : -16,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    top: 20,
    left: 60,
  },
});
