import {
  StyleSheet,
  Text,
  View,Image,

  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState,useEffect } from "react";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";

const genreUrl = "https://api.themoviedb.org/3/genre/movie/list";

const SearchScreen = () => {
  const [Prompt, setPrompt] = useState("");
   const [MovieGenre, setMovieGenre] = useState([]);
   const [SearchMovieData, setSerSearchMovieData] = useState([])


   useEffect(() => {
     getMovieGenre();
    
   }, []);


   const searchMovie = async () => {
     try {
       // Step 1: Get a request token
       const response = await axios({
         method: "GET",
         url: `https://api.themoviedb.org/3/search/movie?query=${Prompt}&inlude_adult=false&languae=en-US&page=1`,
         headers: {
           Authorization: `Bearer ${ACCESS_TOKEN}`,
         },
       });
          setSerSearchMovieData( response.data.results);
       //console.log("response", response.data.results[0]);
     } catch (error) {
       // Handle authentication errors
       console.log("there is an error:", error);
     }
   };



   const getMovieGenre = async () => {
     try {
       // Step 1: Get a request token
       const response = await axios({
         method: "GET",
         url: genreUrl,
         headers: {
           Authorization: `Bearer ${ACCESS_TOKEN}`,
         },
       });
       setMovieGenre(response.data.genres);
       //console.log("response", response.data.genres);
     } catch (error) {
       // Handle authentication errors
       console.log("there is an error:", error);
     }
   };

  const renderMovieGenre = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={()=>{
            setPrompt(item.name)
          searchMovie()
        }}
          style={{
            backgroundColor: "red",
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            height: 60,
            width: 170,
            borderRadius: 10,
            marginHorizontal: 5,
          }}
        >
          <LinearGradient
            style={{
              flex: 1,

              height: "100%",
              borderRadius: 5,
            }}
            colors={["#49494b", "#01010b"]}
          >
            <Text
              style={{
                color: "white",
                marginHorizontal: 10,
                marginVertical: 20,
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

   const renderSearchMovie = ({ item }) => {
     return (
       <>
         <TouchableOpacity
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
  return (
    <>
      <LinearGradient
        style={{ flex: 1, backgroundColor: "#49494b", height: "100%" }}
        colors={["#49494b", "#01010b", "#01010b"]}
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
            marginTop: 20,
          }}
        >
          MovieApp
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={{marginTop:10,
              backgroundColor: "white",
              marginHorizontal: 20,
              borderRadius: 10,
              width: 280,
              padding: 5,
            }}      
            value={Prompt}
            onChangeText={(text) => {
              setPrompt(text)
              
            }}
      
            placeHolder=" enter your search"
          />

          <TouchableOpacity
            onPress={searchMovie}
            style={{ marginTop: 10, alignSelf: "center" }}
          >
            <Ionicons name="search-outline" size={34} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
        {Prompt ? (
          <FlatList
            data={SearchMovieData}
            renderItem={renderSearchMovie}
            numColumns={2}
          />
        ) : (
          <FlatList
            data={MovieGenre}
            renderItem={renderMovieGenre}
            numColumns={2}
          />
        )}
      </LinearGradient>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
