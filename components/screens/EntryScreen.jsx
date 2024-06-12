import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { enterChallenge } from "../../services/dbService";
import { getCurrentUserInfo } from "../../services/authService";
import * as ImagePicker from "expo-image-picker";
import { handleUploadOfImages } from "../../services/bucketService";

export const EntryScreen = ({ route, navigation }) => {
  const { challenge } = route.params;
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const currentUser = getCurrentUserInfo();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    if (!description || images.length === 0) {
      Alert.alert(
        "Validation",
        "Please provide a description and at least one image."
      );
      return;
    }

    const userId = currentUser.uid;
    const username = currentUser.displayName;
    const imageUrls = await handleUploadOfImages(images);

    const result = await enterChallenge(
      challenge.id,
      userId,
      username,
      title,
      description,
      imageUrls // Pass array of URLs instead of a single URL.
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
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <ScrollView horizontal>
        {images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
            <Button
              title="Remove"
              onPress={() => {
                setImages(images.filter((_, idx) => idx !== index));
              }}
            />
          </View>
        ))}
      </ScrollView>
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
  imageContainer: {
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
  },
});
