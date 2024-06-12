import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getTotalVotesPerUser } from "../../services/dbService";
import { Colors } from "../Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export const LeaderboardScreen = () => {
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
            <View key={index} style={styles.card}>
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
            </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    borderRadius: 10,
    marginVertical: 10,
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
    marginBottom: 10,
  },
  trophy: {
    alignSelf: "flex-end",
    alignItems: "center",
    color: Colors.orange,
  },
  trophyContainer: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 5,
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
