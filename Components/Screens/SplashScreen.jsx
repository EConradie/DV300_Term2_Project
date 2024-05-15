import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import BackgroundImage from "../../assets/Images/SplashImage.jpg";

export const SplashScreen = () => {
    return (
        <ImageBackground
          source={require(BackgroundImage)}
          style={SplashStyles.container}
        >
          <Text>Hello</Text>
        </ImageBackground>
      );
};

const SplashStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 65,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    gap: 25,
  },
});
