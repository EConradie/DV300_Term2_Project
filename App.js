import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  { SplashScreen }  from './Components/Screens/SplashScreen.jsx';
import { LoginScreen } from './Components/Screens/LoginScreen.jsx';
import { RegisterScreen } from './Components/Screens/RegisterScreen.jsx';

export default function App() {
  return (
    //<SplashScreen />
    // <LoginScreen />
    <RegisterScreen />
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
