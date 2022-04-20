import React, { useState } from "react";
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
} from "react-native";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

import { ValidationMessage } from "../../ValidationMessage";
import {
  LocalApiUrl,
  regexName,
  regexemail,
  regexpassword,
} from "../../Constant";

const SignUp = (props) => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [isAPILoading, setisAPILoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [Error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { height } = Dimensions.get("screen");

  const textInputChange = (name, val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        [name]: val,
        check_textInputChange: true,
      });
      setError({
        ...Error,
        [name]: "",
      });
    } else {
      setData({
        ...data,
        [name]: val,
        check_textInputChange: false,
      });
    }
  };
  const handleValidation = () => {
    let valid = true;
    let d = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    };
    const isEmpty = Object.values(d).every((x) => x === null || x === "");
    if (isEmpty) {
      setError({
        firstname: ValidationMessage.RequiredName + "First Name",
        lastname: ValidationMessage.RequiredName + "Last Name",
        email: ValidationMessage.RequiredEmail,
        password: ValidationMessage.RequiredPassword,
        confirm_password: ValidationMessage.RequiredPassword,
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
    if (!regexName.test(d.firstname) && isEmpty == false) {
      setError({
        ...Error,
        firstname: ValidationMessage.ValidCharacters,
      });
      valid = false;
    }
    if (!regexName.test(d.lastname) && isEmpty == false) {
      setError({
        ...Error,
        lastname: ValidationMessage.ValidCharacters,
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
    if (d.password != d.confirm_password) {
      setError({
        ...Error,
        confirm_password: ValidationMessage.ConfirmPassword,
      });
      valid = false;
    }

    return valid;
  };

  const handleSignUpWithoutApi = () => {
    props.navigation.navigate("SignIn");
  };
  const handleSignUp = () => {
    let valid = handleValidation();

    if (valid) {
      let Username = data.email.slice();
      axios
        .post(`${LocalApiUrl}/user_register`, {
          username: Username.replace(/@.*$/, ""),
          first_name: data.firstname,
          last_name: data.lastname,
          customeremail: data.email,
          password: data.password,
        })
        .then(async (response) => {
          setisAPILoading(false);
          if (response.data.IsSuccess) {
            props.navigation.navigate("SignIn");
          } else {
            setStatusMessage(response.data.error);
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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
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
        <View style={styles.header}>
          <View style={styles.placement}>
            <Animatable.Text
              animation="bounceInRight"
              style={styles.text_header}
            >
              Register Now !
            </Animatable.Text>
          </View>
        </View>
      </SafeAreaView>
      <Animatable.View animation="bounceInUp" style={styles.footer}>
        <ScrollView>
          {statusMessage.length != 0 && (
            <Text style={{ color: "red" }}>{statusMessage}</Text>
          )}
          <Text style={styles.text_footer}>Firstname</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#004c99"
              size={15}
              style={{ top: 2 }}
            />
            <TextInput
              placeholder="Your Firstname"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.firstname}
              onChangeText={(val) => textInputChange("firstname", val)}
            />
          </View>
          {Error.firstname.length != 0 && (
            <Text style={{ color: "red" }}>{Error.firstname}</Text>
          )}

          {/* Lastname */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Lastname
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#004c99"
              size={15}
              style={{ top: 2 }}
            />
            <TextInput
              placeholder="Your Lastname"
              style={styles.textInput}
              value={data.lastname}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange("lastname", val)}
            />
          </View>
          {Error.lastname.length != 0 && (
            <Text style={{ color: "red" }}>{Error.lastname}</Text>
          )}

          {/* Email */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Email
          </Text>
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
              value={data.email}
              autoCapitalize="none"
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
              onChangeText={(val) => textInputChange("password", val)}
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

          {/* Confirm Password */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={15} style={{ top: 2 }} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange("confirm_password", val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {Error.confirm_password.length != 0 && (
            <Text style={{ color: "red" }}>{Error.confirm_password}</Text>
          )}

          {/* Terms and services */}
         {/*  <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              {" "}
              By signing up you agree to our
            </Text>
            <TouchableOpacity>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Terms of service
              </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> and</Text>
            <TouchableOpacity>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* SignIn */}
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  backgroundColor: "#004c99",
                  borderColor: "#004c99",
                  borderWidth: 1,
                  marginTop: -35,
                },
              ]}
              onPress={handleSignUpWithoutApi}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#ffffff",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* SignIn */}

            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  backgroundColor: "#ffffff",
                  borderColor: "#004c99",
                  borderWidth: 1,
                  marginTop: 10,
                },
              ]}
              onPress={() => props.navigation.navigate("SignIn")}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#004c99",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUp;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004c99",
  },
  placement: {
    top: 50,
    left: 35,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  footer: {
    backgroundColor: "#fff",
    flex: 0.93,
    width: "90%",
    left: 20,
    justifyContent: "center",
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
