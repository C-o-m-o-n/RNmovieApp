import {
  Alert,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
	SafeAreaView
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ACCESS_TOKEN } from "@env";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";


const TrendingMovies = ({ navigation }) => {
  const [TrendingMovies, setTrendingMovies] = useState();
  const [TrendingMovie, setTrendingMovie] = useState();
  const [ModalVisible, setModalVisible] = useState(false);
  const [CurrentMovie, setCurrentMovie] = useState();
  const [CurrentMovieCredits, setCurrentMovieCredits] = useState();


  useEffect(() => {
    getTrendingMovie();
    
  }, []);

  const getTrendingMovie = async () => {
    try {
      // Step 1: Get a request token
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      setTrendingMovies(response.data.results);
      //console.log("response", response.data.results[0]);

      
    } catch (error) {
      // Handle authentication errors
      console.log("there is an error:", error);
    }
  };

const getMovieCredits = async ( CurrentMovieId ) => {
    //let's get the credits for the movie
  const credits_url = `https://api.themoviedb.org/3/movie/${CurrentMovieId}/credits?language=en-US`;
    try {
      // Step 1: Get a request token
      const response = await axios({
        method: "GET",
        url: credits_url,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      setCurrentMovieCredits(response.data.cast);
      // console.log("currentMovieCredits", CurrentMovieCredits);

    } catch (error) {
      // Handle authentication errors
      console.log("there is an error:", error);
    }
  }

  const renderCurrentMovieCredits = ({ item }) => {
    return (
      <View style={{
        justifyContent: "center",
      textAlign: "center",
      alignSelf: "center",
      marginTop: 20,
      marginHorizontal: 10,
      alignItems:"center"
      }}>
        <Image

          source={{
            uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.profile_path}`,
          }}
          style={{ height: 70, width: 70, borderRadius: 50, borderColor:"white", borderWidth:4,opacity:1                                                     }}
        />

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };



  const renderTrendingMovies = ({ item }) => {
    //https://image.tmdb.org/t/p/w600_and_h900_bestv2//mmSSn8Yn3GbJv9MsSnD4J1LnN9l.jpg
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            
            setModalVisible(!ModalVisible);
            setCurrentMovie(item);
            console.log("CurrentMovie", item)

            //get the credits for the movie
            getMovieCredits(item.id);


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
      <SafeAreaView>
        {CurrentMovie && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
          >
            <LinearGradient
              style={{ flex: 1, }}
              colors={["#49494b", "#0C2340"]}
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
                    <Pressable onPress={() => {
                      setModalVisible(!ModalVisible)
                      // setCurrentMovieCredits(null)
                      console.log("Clossing modal")
                    }
                      }>
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
                      {CurrentMovie.title}
                    </Text>

                    <View style={{ height: 20 }} />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
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
                        fontWeight: "bold",
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
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      Votes: {CurrentMovie.vote_count}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        justifyContent: "center",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      Cast
                    </Text>

                    {/* current movie cast */}
                    
                    <FlatList
                    horizontal
                    data={CurrentMovieCredits}
                    renderItem={renderCurrentMovieCredits}
                    />

                  </ScrollView>
                </View>
              </View>
            </LinearGradient>
          </Modal>
        )}
     </SafeAreaView>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#49494b","#0C2340"]}
    >
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: "row", alignItems:"center", justifyContent:"space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={24} color="white" style={{fontWeight:"bold", margin:10, }} />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: 26,
            marginHorizontal: 10,
            fontWeight: "bold",
          }}
        >
          Trending Movies
        </Text>
      </View>
<ScrollView>
   <MovieModal />
      <FlatList
        data={TrendingMovies}
        renderItem={renderTrendingMovies}
        numColumns={2}
      />
</ScrollView>
     
    </LinearGradient>
  );
};

export default TrendingMovies;

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
