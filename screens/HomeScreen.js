import {
  Alert,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  View,ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";


const trendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const trendingTvUrl = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
const trendingPeopleUrl  = "https://api.themoviedb.org/3/trending/person/day?language=en-US";
const HomeScreen = ({ navigation }) => {
  const [TrendingMovies, setTrendingMovies] = useState();
const [TrendingTv, setTrendingTv] = useState();
const [TrendingPeople, setTrendingPeople] = useState([])

  useEffect(() => {
    getTrendingMovie();
     getTrendingTv();
     getTrendingPeople();
  }, []);
//trending movies
    const getTrendingMovie = async () => {
      try {
        // Step 1: Get a request token
        const response = await axios({
          method: "GET",
          url: trendingMovieUrl,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setTrendingMovies(response.data.results.slice(0, 3));
        //console.log("3 response", response.data.results[0]);
        
      } catch (error) {
        // Handle authentication errors
        console.log("there is an error:", error);
      }
    };

//trending tv shows
      const getTrendingTv = async () => {
        try {
          // Step 1: Get a request token
          const response = await axios({
            method: "GET",
            url: trendingTvUrl,
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          });
          setTrendingTv(response.data.results.slice(0, 3));
          //console.log("response", response.data.results[0]);
        } catch (error) {
          // Handle authentication errors
          console.log("there is an error:", error);
        }
      };


      //get trending people
       const getTrendingPeople = async () => {
         try {
           // Step 1: Get a request token
           const response = await axios({
             method: "GET",
             url: trendingPeopleUrl,
             headers: {
               Authorization: `Bearer ${ACCESS_TOKEN}`,
             },
           });
           setTrendingPeople(response.data.results.slice(0, 3));
           //console.log("response people", response.data.results.slice(0, 3));
         } catch (error) {
           // Handle authentication errors
           console.log("there is an error:", error);
         }
       };

       //get trending movies
      const renderTrendingMovies = ({ item }) => {
        //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
        return (
          <>
            <TouchableOpacity
              
              style={{
                marginTop: 10,
                marginBottom: 30,
                flexDirection: "column",
                height: 190,
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

      //render trending series
      const renderTrendingTv = ({ item }) => {
        //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
        return (
          <>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginBottom: 30,
                flexDirection: "column",
                height: 190,
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
                {item.name}
              </Text>
            </TouchableOpacity>
          </>
        );
      };

      //render trending people

  const renderTrendingPeople = ({ item }) => {
         //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
         return (
           <>
             <TouchableOpacity
               style={{
                 marginTop: 10,
                 marginBottom: 30,
                 flexDirection: "column",
                 height: 190,
                 width: 100,

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

  return (
    <>
      <LinearGradient
        style={{ flex: 1, }}
        colors={["#49494b", "#0C2340"]}
      >
        <View style={{ height: 20 }} />
        <Text
          style={{
            color: "white",
            fontSize: 39,
            fontWeight: "bold",
            justifyContent: "center",
            textAlign: "center",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          MovieApp
        </Text>
        <ScrollView>
          <View style={{}}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                marginHorizontal: 5,
              }}
              onPress={() => navigation.navigate("TrendingMovies")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                Trending Movies Today
              </Text>
              <AntDesign
                name="right"
                size={24}
                color="white"
                style={{ margin: 10, fontWeight: "bold" }}
              />
            </TouchableOpacity>
            <FlatList
              data={TrendingMovies}
              renderItem={renderTrendingMovies}
              numColumns={3}
            />
            <View style={{ height: 40 }} />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                marginHorizontal: 5,
              }}
              onPress={() => navigation.navigate("TvShows")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                Trending TV Shows Today
              </Text>
              <AntDesign
                name="right"
                size={24}
                color="white"
                style={{ margin: 10, fontWeight: "bold" }}
              />
            </TouchableOpacity>

            <FlatList
              data={TrendingTv}
              renderItem={renderTrendingTv}
              numColumns={3}
            />

            <View style={{ height: 40 }} />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                marginHorizontal: 5,
              }}
              onPress={() => navigation.navigate("TrendingPeople")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                Trending People Today
              </Text>
              <AntDesign
                name="right"
                size={24}
                color="white"
                style={{ margin: 10, fontWeight: "bold" }}
              />
            </TouchableOpacity>

            
            <FlatList
              data={TrendingPeople}
              renderItem={renderTrendingPeople}
              numColumns={3}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
