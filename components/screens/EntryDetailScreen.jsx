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
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.header}>{entry.username}</Text>
      <Text style={styles.description}>{entry.description}</Text>
      <View style={styles.imageContainer}>
        {entry.images?.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.fullImage} />
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.button, hasVoted ? styles.disabledButton : null]} 
        onPress={handleVote}
        disabled={hasVoted}
      >
        <Text style={styles.buttonText}>{hasVoted ? "Already Voted" : "VOTE"}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    backgroundColor: Colors.gray,
  },
  header: {
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
    color: Colors.orange,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.white,
  },
  fullImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.orange,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  disabledButton: {
    backgroundColor: Colors.darkGray,
  },
});
