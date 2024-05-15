import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  { SplashScreen }  from './Components/Screens/SplashScreen.jsx';
import { LoginScreen } from './Components/Screens/LoginScreen.jsx';

export default function App() {
  return (
    <SplashScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
