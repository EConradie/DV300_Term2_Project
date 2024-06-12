import React, { useState } from "react";
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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { addChallenge } from "../../services/dbService";
import { getCurrentUserInfo } from "../../services/authService";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export const CreateChallengeScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentUser = getCurrentUserInfo();
  const userId = currentUser.uid;
  const username = currentUser.displayName;

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
    setShowDatePicker(Platform.OS === "ios"); // for iOS, keep the picker open until manually closed
    setEndDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !image) {
      Alert.alert("Error", "Please fill all fields and select an image");
      return;
    }

    const success = await addChallenge(
      title,
      description,
      category,
      userId,
      username,
      image,
      endDate
    );
    if (success) {
      Alert.alert("Success", "Challenge created successfully");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to create challenge");
    }
  };

  return (
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
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.descInput}
        value={description}
        onChangeText={setDescription}
        multiline
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
        accentColor={Colors.orange}
        style={styles.datePicker}
      />
      <Text style={styles.label}>Category:</Text>
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item color="white" label="Fixed Knives" value="Fixed Knives" />
        <Picker.Item color="white" label="Chef Knives" value="Chef Knives" />
        <Picker.Item
          color="white"
          label="Forged Knives"
          value="Forged Knives"
        />
      </Picker>

      

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSubmit}>
          Create
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
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
    width: '100%',
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
});
