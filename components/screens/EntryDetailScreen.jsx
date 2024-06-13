import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { addVote, checkUserHasVoted } from "../../services/dbService";
import { getCurrentUserInfo } from "../../services/authService";
import { Colors } from "../Styles";

export const EntryDetailScreen = ({ route, navigation }) => {
  const { entry, challenge } = route.params;
  const currentUser = getCurrentUserInfo();
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const checkVoteStatus = async () => {
      const voted = await checkUserHasVoted(currentUser.uid, challenge.id, entry.id);
      setHasVoted(voted);
    };

    checkVoteStatus();
  }, [currentUser.uid, challenge.id, entry.id]);

  const handleVote = async () => {
    const success = await addVote(currentUser.uid, challenge.id, entry.id);
    if (success) {
      setHasVoted(true);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.header}>{entry.username}</Text>
        <Text style={styles.description}>{entry.description}</Text>
        <ScrollView horizontal>
          <View style={styles.imageContainer}>

            {entry.images?.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.fullImage} />
            ))}

          </View>
        </ScrollView>
        <View style={styles.votesContainer}>
          <Text style={styles.votes}>Total Votes: {entry.votesCount}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, hasVoted ? styles.disabledButton : null]}
          onPress={handleVote}
          disabled={hasVoted}
        >
          <Text style={styles.buttonText}>{hasVoted ? "Already Voted" : "VOTE"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
    paddingTop: 75,
    backgroundColor: Colors.gray,
  },
  header: {
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
    color: Colors.orange,
    alignSelf: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.white,
    backgroundColor: Colors.lightGray,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  fullImage: {
    width: 200,
    marginRight: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white,
    alignSelf: "center",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.orange,
  },
  votesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
    marginBottom: 10,
  },
  votes: {
    fontWeight: "bold",
    color: Colors.white,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  disabledButton: {
    backgroundColor: Colors.darkGray,
  },
  scrollContainer: {
    backgroundColor: Colors.gray,
    height: "100%",
  },
});
