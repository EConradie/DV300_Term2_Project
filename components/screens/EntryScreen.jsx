import React, { useState, useCallback } from "react";
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
  ActivityIndicator,
} from "react-native";
import { enterChallenge } from "../../services/dbService";
import { getCurrentUserInfo } from "../../services/authService";
import * as ImagePicker from "expo-image-picker";
import { handleUploadOfImages } from "../../services/bucketService";
import { Colors } from "../Styles"; 
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export const EntryScreen = ({ route, navigation }) => {
  const { challenge } = route.params;
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUserInfo();
      setCurrentUser(user);
      if (!user) {
        console.error('No user data returned from getCurrentUserInfo');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useFocusEffect (
    useCallback(() => {
      fetchCurrentUser();
      return () => {};
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    if (!description || images.length === 0) {
      Alert.alert("Validation", "Please provide a description and at least one image.");
      return;
    }

    const imageUrls = await handleUploadOfImages(images);

    const result = await enterChallenge(
      challenge.id,
      currentUser.uid,
      currentUser.username,
      title,
      description,
      imageUrls
    );

    if (result) {
      Alert.alert("Success", "Entry submitted successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to submit entry.");
      setSubmitLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Enter Challenge</Text>
      </View>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={Colors.lightGray}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.descInput}
        placeholder="Description"
        placeholderTextColor={Colors.lightGray}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button style={styles.imageButton} title="Pick an images from camera roll" onPress={pickImage} color={Colors.orange} />
      <ScrollView horizontal style={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
            <Button
              title="Remove"
              onPress={() => setImages(images.filter((_, idx) => idx !== index))}
              color={Colors.orange}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        {submitLoading ? <ActivityIndicator size="small" color={Colors.white} /> : <Text style={styles.buttonText}>Submit Entry</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 75,
    backgroundColor: Colors.gray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: Colors.gray,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
  },
  descInput: {
    width: "100%",
    height: 100,
    borderColor: Colors.gray,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  imageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    height: 50,
    borderRadius: 5,

  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    marginRight: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.white,
  },
  imageButton: {
    marginBottom: 20,
  },
});
