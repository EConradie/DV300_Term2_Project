import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getChallengeDetails,
  getEntriesByChallengeId,
} from "../../services/dbService";

export const DetailsScreen = ({ route, navigation }) => {
  const { challenge } = route.params;
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchDetailsAndEntries = async () => {
        const entriesData = await getEntriesByChallengeId(challenge.id);
        setEntries(entriesData);
      };

      fetchDetailsAndEntries();

      return () => {};
    }, [challenge.id])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      <Button
        title="Enter This Challenge"
        onPress={() =>
          navigation.navigate("Entry", { challengeId: challenge.id })
        }
      />
      <Text style={styles.entriesTitle}>Entries from Participants</Text>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry) => (
          <View key={entry.id} style={styles.entry}>
            <Text style={styles.entryText}>{entry.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  entriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  entriesContainer: {
    width: "100%",
  },
  entry: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
  },
  entryText: {
    fontSize: 16,
  },
});
