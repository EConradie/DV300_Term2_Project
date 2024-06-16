import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Colors } from "../Styles"; // Ensure this import path is correct
import { useFocusEffect } from "@react-navigation/native";
import { getEntriesByUserId } from "../../services/dbService";
import { getCurrentUserInfo } from "../../services/authService";
import * as ImagePicker from "expo-image-picker";
import { handleUploadProfileImage } from "../../services/bucketService";

export const ProfileScreen = ({ navigation, route }) => {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); 

  const updateProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      const imageUrl = await handleUploadProfileImage(
        result.assets[0].uri,
        currentUser.uid
      );
      setCurrentUser({ ...currentUser, imageUrl });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUserInfo();
      setCurrentUser(user);
      if (!user) {
        console.error("No user data returned from getCurrentUserInfo");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

 

  const fetchEntries = async () => {
    const data = await getEntriesByUserId(auth.currentUser.uid);
    setEntries(data);
    setTotalEntries(data.length);

    const calculatePoints = async () => {
      let totalVotes = 0;
      data.forEach((entry) => {
        totalVotes += entry.votesCount;
      })
      setPoints(totalVotes);
      setLoading(false); 
    };

    calculatePoints();
    
  };

  useFocusEffect(
    useCallback(() => {
      fetchCurrentUser();
      fetchEntries();

      return () => {};
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.orange} style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.gray }} />;
  }

  return (
    <>
      <View style={styles.header}></View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={updateProfileImage}
        >
          <Image style={styles.image} source={{ uri: currentUser?.imageUrl }} />
        </TouchableOpacity>
        <View style={styles.userInfoSection}>
          <Text style={styles.username}>
            {auth.currentUser?.displayName || "Not set"}
          </Text>
          <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.pointsSection}>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{points}</Text>
            <Text style={styles.pointsText}>Points</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{totalEntries}</Text>
            <Text style={styles.pointsText}>Entries</Text>
          </View>
        </View>
        <Text style={styles.entryLabel}>User Entries:</Text>

        <View style={styles.entriesContainer}>
          <ScrollView horizontal>
            {entries &&
              entries.map((entry, index) => (
                <TouchableOpacity style={styles.entryCard} key={index}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Image
                    source={{ uri: entry.images[0] }}
                    style={styles.entryImage}
                  ></Image>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text
            style={styles.buttonText}
            source={require("../../assets/images/SplashImage.jpg")}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 75,
    backgroundColor: Colors.gray,
  },
  userInfoSection: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 0,
  },
  userEmail: {
    fontSize: 18,
    color: Colors.white,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    shadowColor: Colors.orange,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 3,
    marginTop: -175,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  header: {
    height: 200,
    backgroundColor: Colors.lightGray,
    width: "100%",
  },
  pointsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  pointsText: {
    fontSize: 18,
    color: "gray",
  },
  pointsSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 65,
    marginBottom: 20,
  },
  entryLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.orange,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  entriesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  entryCard: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  entryImage: {
    width: 150,
    height: 80,
    borderRadius: 5,
  },
  entryTitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 5,
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
    height: 20,
  },
});