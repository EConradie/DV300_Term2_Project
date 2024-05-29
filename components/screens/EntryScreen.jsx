import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { enterChallenge } from "../../services/dbService";

export const EntryScreen = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    if (!description) {
      Alert.alert("Validation", "Please provide a description for the entry.");
      return;
    }

    const userId = "some-user-id";
    const result = await enterChallenge(
      challengeId,
      userId,
      description,
      image
    );

    if (result) {
      Alert.alert("Success", "Entry submitted successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to submit entry.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Challenge</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Submit Entry" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
