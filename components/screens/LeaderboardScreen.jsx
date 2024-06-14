import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { getTotalVotesPerUser } from "../../services/dbService";
import { Colors } from "../Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export const LeaderboardScreen = ( { navigation, route }) => {
  const [leaders, setLeaders] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLeaders = async () => {
        const users = await getTotalVotesPerUser();
        setLeaders(users);
      };

      fetchLeaders();

      return () => {};
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>

        <ScrollView>
          {leaders.map((user, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("User", { user })}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: user.imageUrl }}></Image>
              </View>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{user.username}</Text>
                <Text style={styles.votes}>{user.votes} Votes</Text>
              </View>
              {index === 0 && (
                <View style={styles.trophyContainer}>
                  <Ionicons
                    style={styles.trophy}
                    name="trophy"
                    size={24}
                    color={Colors.orange}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray,
    paddingTop: 75,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  votes: {
    fontSize: 16,
    color: Colors.orange,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    color: Colors.white,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  trophy: {
    color: Colors.orange,
  },
  trophyContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 26,
    paddingRight: 20,
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
    marginTop: 2,
  },
  imageContainer: {
    alignSelf: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
