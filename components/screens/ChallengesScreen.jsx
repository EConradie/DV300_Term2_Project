import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getChallenges } from "../../services/dbService";
import { useFocusEffect } from "@react-navigation/native";

export const ChallengesScreen = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchChallenges = async () => {
        const data = await getChallenges();
        setChallenges(data);
      };

      fetchChallenges();

      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button
        title="Create Challenge"
        onPress={() => navigation.navigate("CreateChallenge")}
      />
      <ScrollView style={styles.scrollView}>
        {challenges.map((challenge, index) => (
          <TouchableOpacity
            key={index}
            style={styles.challengeItem}
            onPress={() => navigation.navigate("Details", { challenge })}
          >
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 75,
    backgroundColor: "#f0f2f5",
  },
  scrollView: {
    width: "100%",
  },
  challengeItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
