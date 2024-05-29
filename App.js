import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { CompetitionScreen } from './components/screens/CompetitionScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { Colors } from './components/Styles'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedInNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.darkGray },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Competitions') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Competitions" component={CompetitionScreen} />
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
    return () => unsubscribe(); // This ensures we clean up the listener on unmount
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
