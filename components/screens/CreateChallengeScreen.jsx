import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { addChallenge } from "../../services/dbService";
import { Colors } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import { Keyboard } from "react-native";
import { checkIfUserIsJudge } from "../../services/dbService";
import { auth } from "../../config/firebase";

export const CreateChallengeScreen = ({ navigation }) => {
  const descriptionInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isJudge, setIsJudge] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchCurrentUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in");
      return;
    }
    setCurrentUser(user);
    checkJudgeStatus(user.uid);
  };

  const checkJudgeStatus = async (userId) => {
    const judgeStatus = await checkIfUserIsJudge(userId);
    setIsJudge(judgeStatus);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCurrentUser();

      return () => {};
    }, [])
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    setCreateLoading(true);
    if (!title || !description || !category || !image) {
      Alert.alert("Error", "Please fill all fields and select an image");
      return;
    }

    const success = await addChallenge(
      title,
      description,
      category,
      currentUser.uid,
      currentUser.displayName,
      image,
      endDate
    );
    if (success) {
      Alert.alert("Success", "Challenge created successfully");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to create challenge");
      setCreateLoading(false);
    }
  };

  return (
    <>
      {isJudge && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons
              style={styles.headerIcon}
              name="chevron-back"
              size={24}
              color={Colors.white}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Create Challenge</Text>
          </View>
          <ScrollView>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {!image && <Text style={styles.pickImageText}>Pick Image</Text>}
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </TouchableOpacity>

            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              ref={descriptionInputRef}
              style={styles.descInput}
              value={description}
              onChangeText={setDescription}
              multiline
              onPress={dismissKeyboard}
            />
            <Text style={styles.label}>End Date:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
              textColor="white"
              themeVariant="dark"
              accentColor={Colors.orange}
              style={styles.datePicker}
            />
            <Text style={styles.label}>Category:</Text>
            <ModalDropdown
              options={["Fixed Knives", "Chef Knives", "Forged Knives"]}
              defaultValue="Select"
              onSelect={(index, value) => setCategory(value)}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              dropdownTextStyle={styles.dropdownDropdownText}
              dropdownTextHighlightStyle={styles.dropdownTextHighlight}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {createLoading ? <ActivityIndicator size="small" color={Colors.white} /> : <Text style={styles.buttonText}>Create</Text>}
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    paddingTop: 75,
    backgroundColor: Colors.gray,
    color: Colors.white,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.white,
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
    paddingHorizontal: 10,
    color: Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  inputField: {
    borderWidth: 2,
    marginTop: 15,
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    alignSelf: "center",
    textAlign: "center",
    marginRight: 20,
  },
  headerIcon: {},
  picker: {
    color: Colors.white,
    marginTop: -30,
  },
  datePicker: {
    color: Colors.white,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 15,
    textColor: Colors.white,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
  pickImageText: {
    color: Colors.orange,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.orange,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  dropdownText: {
    margin: 10,
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
  },
  dropdownDropdown: {
    width: "91%", // Adjust the width as necessary
    borderColor: Colors.gray,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: Colors.lightGray,
    height: "200",
  },
  dropdownDropdownText: {
    fontSize: 16,
    color: Colors.white,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropdownTextHighlight: {
    color: Colors.orange,
    backgroundColor: Colors.darkGray,
  },
});
