import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
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
          navigation.navigate("Entry", { challenge: challenge })
        }
      />
      <Text style={styles.entriesTitle}>Entries from Participants</Text>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            onPress={() => navigation.navigate("EntryDetail", { entry: entry, challenge: challenge })}
            style={styles.entryCard}
          >
            <Text style={styles.entryUsername}>{entry.username}</Text>
            <Text style={styles.entryDescription}>{entry.description}</Text>
            <ScrollView horizontal style={styles.imageContainer}>
              {entry.images?.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.image} />
              ))}
            </ScrollView>
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
  entryCard: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  entryUsername: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  entryDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});
