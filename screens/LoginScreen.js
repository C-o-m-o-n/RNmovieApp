import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// curl --request GET \
//      --url https://api.themoviedb.org/3/authentication \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWI5YjNlYjRhY2I2MjI4OTdiZDQ4YzM1OWVmOWUzZSIsInN1YiI6IjYzZjM1MGJiNTI0OTc4MDBkYzQ0NTFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GopxSc92jiCxCJCf4XMPPIpPnORquU7nyTJ2phHUgsU' \
//      --header 'accept: application/json'
const url = "https://api.themoviedb.org/3/authentication/guest_session/new";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
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
    checkGuestSessionIdValidity();
  }, []);

  const handleLogin = async () => {
    try {
      // Step 1: Get a request token
      const tokenResponse = await axios({
        method: "GET",
        url: url,
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
        AsyncStorage.setItem("guest_session_id", tokenResponse.data.guest_session_id);
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
        <View style={{ height: 80 }} />

        <Text style={{ color: "white", fontSize: 30 }}>
          welcome to the movie app{" "}
        </Text>

        <View style={{ alignContent: "center" }}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={styles.loginText}>Login with IMDB</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Login as a guest</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 40 }} />
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#4b4b4e",
            marginHorizontal: 10,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.loginText}>continue wth google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#4b4b4e",
            marginHorizontal: 10,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.loginText}>continue wth facebook</Text>
        </TouchableOpacity>
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
  },
  loginButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4b4b4e",
    marginHorizontal: 10,
    borderRadius: 20,
  },
});
