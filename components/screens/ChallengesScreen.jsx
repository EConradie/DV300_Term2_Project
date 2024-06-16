import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getChallenges } from "../../services/dbService";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../config/firebase";
import { checkIfUserIsJudge } from "../../services/dbService";

export const ChallengesScreen = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);
  const [isJudge, setIsJudge] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const fetchChallenges = async () => {
    const data = await getChallenges();
    setChallenges(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchChallenges();
      fetchCurrentUser();
      return () => {};
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Challenges</Text>
          {isJudge && (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateChallenge")}
            >
              <Ionicons
                name={"add-circle-outline"}
                size={35}
                color={Colors.orange}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.scrollView}>
          {challenges.map((challenge, index) => (
            <TouchableOpacity
              key={index}
              style={styles.challengeItem}
              onPress={() => navigation.navigate("Details", { challenge })}
            >
              <Image
                style={styles.image}
                source={{ uri: challenge.imageUrl }}
              ></Image>
              <View style={styles.textContainer}>
                <Text style={styles.Itemtitle}>{challenge.title}</Text>
                <Text style={styles.category}>{challenge.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 75,
    backgroundColor: Colors.gray,
  },
  scrollView: {
    width: "100%",
  },
  challengeItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginBottom: 10,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    color: Colors.white,
    alignSelf: "flex-start",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: "auto",
    borderRadius: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: 200,
  },
  category: {
    fontSize: 14,
    color: Colors.orange,
    marginTop: 5,
  },
  Itemtitle: {
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.white,
    alignSelf: "flex-start",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});
