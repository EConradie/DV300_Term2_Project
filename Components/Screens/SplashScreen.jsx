import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Image
} from "react-native";
import BackgroundImage from "../../assets/Images/SplashImage.jpg";
import LogoImage from "../../assets/Icons/logo-name.png";
import { Colors } from "../Styles";

export const SplashScreen = () => {
  return (
    <ImageBackground source={BackgroundImage} style={SplashStyles.background}>
      <View style={SplashStyles.overlay}>
        <View style={SplashStyles.container}>
            <Image source={LogoImage} style={SplashStyles.logo} />
        </View>
      </View>
    </ImageBackground>
  );
};

const SplashStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 65,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text:{
    color: Colors.white
  },
  logo:{
    width: 200,  
    height: 50,
  }
});
