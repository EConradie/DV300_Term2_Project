import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { ChallengesScreen } from "./components/screens/ChallengesScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { Colors } from "./components/Styles";
import { DetailsScreen } from "./components/screens/DetailsScreen";
import { EntryScreen } from "./components/screens/EntryScreen";
import { CreateChallengeScreen } from "./components/screens/CreateChallengeScreen";
import { EntryDetailScreen } from "./components/screens/EntryDetailScreen";
import { LeaderboardScreen } from "./components/screens/LeaderboardScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CompetitionsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Challenge" component={ChallengesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
      <Stack.Screen name="Entry" component={EntryScreen} />
      <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
    </Stack.Navigator>
  );
}

function LoggedInNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {borderTopWidth: 0, backgroundColor: Colors.darkGray, paddingTop: 10},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Challenges") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Challenges" component={CompetitionsNavigator} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in user: " + user.email);
        setIsLoggedIn(true);
      } else {
        console.log("Not logged in");
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <LoggedInNavigator />
      ) : (
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
