import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "../Styles"; // Ensure this import path is correct
import { useFocusEffect } from "@react-navigation/native";
import { getEntriesByUserId } from "../../services/dbService";


export const UserScreen = ({ navigation, route }) => {
    const [user, setUser] = useState(route.params.user);
    const [entries, setEntries] = useState([]);
    const [totalEntries, setTotalEntries] = useState(0);
  
    const fetchData = async () => {
      try {
        const data = await getEntriesByUserId(user.id);
        setEntries(data);
        setTotalEntries(data.length);
        console.log(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        setUser(route.params.user);
        fetchData();
        setEntries([]);
        setTotalEntries(0);
        return () => {};
      }, [route.params.user])
    );

  return (
    <>
      <View style={styles.header}></View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={{ uri: user?.imageUrl }} />
        </TouchableOpacity>
        <View style={styles.userInfoSection}>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <View style={styles.pointsSection}>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{user.votes}</Text>
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
    backgroundColor: Colors.gray,
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
