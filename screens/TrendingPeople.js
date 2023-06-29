import {
  Alert,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const url = "https://api.themoviedb.org/3/trending/person/day?language=en-US";

const TrendingPeople = ({ navigation }) => {
  const [TrendingPeople, setTrendingPeople] = useState();
  const [TrendingMovie, setTrendingMovie] = useState();
  const [PersonModalVisible, setPersonModalVisible] = useState(false);
  const [MovieModalVisible, setMovieModalVisible] = useState(false);
  const [CurrentPerson, setCurrentPerson] = useState();
  const [CurrentMovie, setCurrentMovie] = useState();

  const [KnownFor, setKnownFor] = useState([]);

  useEffect(() => {
    getTrendingPeople();
  }, []);

  const getTrendingPeople = async () => {
    try {
      // Step 1: Get a request token
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setTrendingPeople(response.data.results);
      //console.log("response", response.data.results[0]);
    } catch (error) {
      // Handle authentication errors
      console.log("there is an error:", error);
    }
  };

  const renderTrendingPeople = ({ item }) => {
    //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            
            setPersonModalVisible(!PersonModalVisible);
            setCurrentPerson(item);
            setKnownFor(item.known_for);
           
            
          }}
          style={{
            marginTop: 20,
            marginBottom: 30,
            flexDirection: "column",
            height: 190,
            width: 160,

            marginHorizontal: 10,
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.profile_path}`,
            }}
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
          />
          <Text
            style={{
              color: "white",
              marginHorizontal: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  //known for

  const renderKnownFor = ({ item }) => {
    //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setCurrentMovie(item);

            setMovieModalVisible(!MovieModalVisible);
          }}
          style={{
            marginTop: 20,
            marginBottom: 30,
            flexDirection: "column",
            height: 150,
            width: 100,

            marginHorizontal: 10,
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`,
            }}
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
          />
          <Text
            style={{
              color: "white",
              marginHorizontal: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const MovieModal = () => {
    return (
      <>
        {CurrentMovie && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={MovieModalVisible}
          >
            <LinearGradient
              style={{ flex: 1, backgroundColor: "#49494b", height: "100%" }}
              colors={["#49494b", "#01010b", "#01010b"]}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    marginHorizontal: 2,
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${CurrentMovie.backdrop_path}`,
                  }}
                />

                <View style={styles.overLay}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => setMovieModalVisible(!MovieModalVisible)}
                    >
                      <AntDesign
                        name="down"
                        size={24}
                        color="white"
                        style={{ margin: 10, fontWeight: "bold" }}
                      />
                    </Pressable>
                    <Pressable>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="white"
                        style={{ margin: 10 }}
                      />
                    </Pressable>
                  </View>
                  <View style={{ height: 240 }} />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 39,
                      fontWeight: "bold",
                      justifyContent: "center",
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    {CurrentMovie.title}
                  </Text>

                  <View style={{ height: 20 }} />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      justifyContent: "center",
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    {CurrentMovie.overview}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      justifyContent: "center",
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    Date Released: {CurrentMovie.release_date}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      justifyContent: "center",
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    Votes: {CurrentMovie.vote_count}
                  </Text>
                  <ScrollView>
                    <View style={{ height: 240 }} />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 39,
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      {CurrentMovie.name}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </LinearGradient>
          </Modal>
        )}
      </>
    );
  };

  const PersonModal = () => {
    return (
      <>
        {CurrentPerson && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={PersonModalVisible}
          >
            <LinearGradient
              style={{ flex: 1, backgroundColor: "#49494b", height: "100%" }}
              colors={["#49494b", "#01010b", "#01010b"]}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    marginHorizontal: 2,
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${CurrentPerson.profile_path}`,
                  }}
                />

                <View style={styles.overLay}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => setPersonModalVisible(!PersonModalVisible)}
                    >
                      <AntDesign
                        name="down"
                        size={24}
                        color="white"
                        style={{ margin: 10, fontWeight: "bold" }}
                      />
                    </Pressable>
                    <Pressable>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="white"
                        style={{ margin: 10 }}
                      />
                    </Pressable>
                  </View>
                  <ScrollView>
                    <View style={{ height: 240 }} />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 39,
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      {CurrentPerson.name}
                    </Text>

                    <View style={{ height: 80 }} />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 39,
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      Best Titles
                    </Text>
                    <FlatList
                      data={KnownFor}
                      renderItem={renderKnownFor}
                      numColumns={3}
                    />
                  </ScrollView>
                </View>
              </View>
            </LinearGradient>
          </Modal>
        )}
      </>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
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
          Trending Actors
        </Text>
      </View>
      <PersonModal />
      <MovieModal />
      <FlatList
        data={TrendingPeople}
        renderItem={renderTrendingPeople}
        numColumns={2}
      />
    </LinearGradient>
  );
};

export default TrendingPeople;

const styles = StyleSheet.create({
  overLay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#01010b",
    opacity: 0.5,
  },
});
