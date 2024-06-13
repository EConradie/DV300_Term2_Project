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
import { Colors } from "../Styles";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={detailStyles.imageContainer}>
          <Image
            style={detailStyles.image}
            source={{ uri: challenge.imageUrl }}
          ></Image>
        </View>

        <View style={detailStyles.container}>
          <View style={detailStyles.textContainer}>
            <Text style={detailStyles.endDate}>
              Challenge ends:{" "}
              {new Date(challenge.endDate.toDate()).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={detailStyles.infoContainer}>
          <Text style={detailStyles.title}>{challenge.title}</Text>
          <Text style={detailStyles.description}>{challenge.description}</Text>
          <Text style={detailStyles.category}>
            Category: {challenge.category}
          </Text>
          <Text style={detailStyles.author}>
            Created by: {challenge.authorName}
          </Text>
        </View>


        <View style={detailStyles.container}>
          <View style={detailStyles.textContainer}>
            <Text style={detailStyles.entryTitle}>
              {entries.length} Entries
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Entry", { challenge: challenge })
              }
            >
              <Ionicons
                name={"add-circle-outline"}
                size={30}
                color={Colors.orange}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.entriesContainer}>
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              onPress={() =>
                navigation.navigate("EntryDetail", {
                  entry: entry,
                  challenge: challenge,
                })
              }
              style={styles.entryCard}
            >
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryVotes}>{entry.votesCount}</Text>                
              </View>

              <Text style={styles.entryUsername}>{entry.username}</Text>

              <ScrollView horizontal style={styles.imageContainer}>
                {entry.images?.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
              {/* <Text style={styles.entryDescription}>{entry.description}</Text> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const detailStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 10,
  },
  imageContainer: {
    width: "100%",
  },
  textContainer: {
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  endDate: {
    fontSize: 16,
    fontWeight: "semibold",
    color: Colors.orange,
  },
  infoContainer: {
    padding: 20,
    width: "100%",
  },
  category: {
    fontSize: 14,
    color: "gray",
  },
  author: {
    fontSize: 14,
    color:"gray",
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "semibold",
    color: Colors.orange,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    paddingTop: 75,
    height: "100%",
  },
  scrollContainer: {
    backgroundColor: Colors.gray,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: Colors.white,
  },
  entriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  entriesContainer: {
    width: "100%",
    padding: 20,
  },
  entryCard: {
    backgroundColor: Colors.lightGray,
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
    fontWeight: "semibold",
    color: Colors.orange,
  },
  entryDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    color: Colors.white,
    marginTop: 15,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 5,
    width: 200
  },
  entryTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  entryVotes: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.orange,
    marginRight: 5,
    position: "absolute",
    right: 0,
    top: 0
  },
});
