import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = ({navigation}) => {
  return (
    <LinearGradient
      style={{ flex: 1, backgroundColor: "#49494b", height: "100%" }}
      colors={["#49494b", "#01010b", "#01010b"]}
    >
      <View style={{ height: 20 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={{ fontWeight: "bold", margin: 10 }}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: 26,
            marginHorizontal: 10,
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
      </View>
      <View style={{ height: 20 }} />
      <Text
        style={{
          color: "white",
          fontSize: 26,
          marginHorizontal: 10,
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        We will allow you to create accounts soon. We are still testing the
        app's functionality. Thak you for understanding
      </Text>
    </LinearGradient>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({})