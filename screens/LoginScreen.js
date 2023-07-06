import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Linking,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { ACCESS_TOKEN } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// curl --request GET \
//      --url https://api.themoviedb.org/3/authentication \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWI5YjNlYjRhY2I2MjI4OTdiZDQ4YzM1OWVmOWUzZSIsInN1YiI6IjYzZjM1MGJiNTI0OTc4MDBkYzQ0NTFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GopxSc92jiCxCJCf4XMPPIpPnORquU7nyTJ2phHUgsU' \
//      --header 'accept: application/json'
const newSessionUrl = "https://api.themoviedb.org/3/authentication/session/new";

const guestSessionUrl =
  "https://api.themoviedb.org/3/authentication/guest_session/new";

const newTokenUrl = " https://api.themoviedb.org/3/authentication/token/new";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RequestToken, setRequestToken] = useState("");

  useEffect(() => {}, []);

  const handleTmdbLogin = async () => {
    requestNewToken();
    createNewSession();
  };

  const checkGuestSessionIdValidity = async () => {
    const guest_session_id = await AsyncStorage.getItem("guest_session_id");
    const expirationTime = await AsyncStorage.getItem("expirationTime");
    console.log("guest_session_id", guest_session_id);
    console.log("expirationTime", expirationTime);

    //check if the guest_session_id is valid
    if (guest_session_id && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime)) {
        //the guest session has not expired
        navigation.replace("Main");
      } else {
        //the guest session has expired
        AsyncStorage.removeItem("guest_session_id");
        AsyncStorage.removeItem("expirationTime");
      }
    }
  };

  const checkUserSessionIdValidity = async () => {
    const guest_session_id = await AsyncStorage.getItem("guest_session_id");
    const expirationTime = await AsyncStorage.getItem("expirationTime");
    console.log("guest_session_id", guest_session_id);
    console.log("expirationTime", expirationTime);

    //check if the guest_session_id is valid
    if (guest_session_id && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime)) {
        //the guest session has not expired
        navigation.replace("Main");
      } else {
        //the guest session has expired
        AsyncStorage.removeItem("guest_session_id");
        AsyncStorage.removeItem("expirationTime");
      }
    }
  };

  const requestNewToken = async () => {
    try {
      // Step 1: Get a request token
      const tokenResponse = await axios({
        method: "GET",
        url: newTokenUrl,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      //const requestToken = tokenResponse.data.request_token;
      setRequestToken(tokenResponse.data.request_token);
      console.log("requestToken", RequestToken);
      const authUrl = `https://www.themoviedb.org/authenticate/${RequestToken}`;
      await Linking.openURL(authUrl); // Step 2: Redirect the user to the TMDB website for authentication

      //.then((response) => {
      //   //console.log(response);
      // });
      // The user will be redirected back to your app after successful authentication
      // Handle the redirection in your app's deep link or navigation system
    } catch (err) {
      console.log(err.message);
    }
  };

  const createNewSession = async () => {
    try {
      // Step 2: Create a session with the request token
      const sessionResponse = await axios({
        method: "POST",
        url: newSessionUrl,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          request_token: encodeURIComponent(RequestToken),
        },
      });
      const sessionId = sessionResponse.data.session_id;
      console.log("Session ID:", sessionId);
    } catch (err) {
      console.log("errrrr", err);
    }
  };

  const handleGuestLogin = async () => {
    try {
      // Step 1: Get a request token
      const tokenResponse = await axios({
        method: "GET",
        url: guestSessionUrl,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      //console.log("tokenresponse", tokenResponse);
      if (tokenResponse.data.guest_session_id) {
        //console.log(tokenResponse.data.guest_session_id);
        const expires_time = tokenResponse.data.expires_at;
        const expires_time_slice = expires_time.slice(
          expires_time.length - expires_time.length,
          expires_time.length - 4
        );
        const expirationTime = new Date(
          expires_time_slice.toString()
        ).getTime();
        console.log("first expt", expirationTime);

        //save the guest_session-id in the asyncstorage object
        AsyncStorage.setItem(
          "guest_session_id",
          tokenResponse.data.guest_session_id
        );
        AsyncStorage.setItem("expirationTime", expirationTime.toString());
        navigation.navigate("Main");
      }
    } catch (error) {
      // Handle authentication errors
      console.log("Authentication error:", error);
    }
  };

  return (
    <>
      <LinearGradient
        style={styles.LinearGradient}
        colors={["#49494b", "#01010b", "#01010b"]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          welcome to the movie app. This is just a simple mobile app that will
          show you the details about the currently trnding movies and tv
          shows.more features will be added in upcoming versions. I hope it will
          be fun using
        </Text>
        <View style={{ height: 80 }} />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",

                marginHorizontal: 5,
              }}
              onPress={() => {
                Alert.alert("This feature will be working soon");
                //handleTmdbLogin();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                Login with IMDB
              </Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="white"
                style={{ margin: 10, fontWeight: "bold" }}
              />
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",

                marginHorizontal: 5,
              }}
              onPress={() => handleGuestLogin()}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                Login as Guest
              </Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="white"
                style={{ margin: 10, fontWeight: "bold" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </LinearGradient>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    justifyContent: "center",
  },
  TextInput: {
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  loginButton: {
    marginTop: 10,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#4b4b4e",
    marginHorizontal: 10,
    borderRadius: 20,
  },
});
