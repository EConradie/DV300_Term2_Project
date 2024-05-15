import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "../../assets/images/SplashImage.jpg";
import LogoImage from "../../assets/icons/logo-name.png";
import { Colors } from "../Styles";
import { Ionicons } from "@expo/vector-icons";

export const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={RegisterStyles.background}>
      <ImageBackground
        source={BackgroundImage}
        style={RegisterStyles.background}
        onLoad={() => setIsLoading(false)}
      >
        <View style={RegisterStyles.overlay}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.orange} />
          ) : (
            <View style={RegisterStyles.container}>
              <Image source={LogoImage} style={RegisterStyles.logo} />

              {/* USERNAME INPUT */}
              <View style={InputStyle.container}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={Colors.icon}
                  style={InputStyle.Icon}
                />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="white"
                  style={InputStyle.input}
                />
              </View>

              {/* EMAIL INPUT */}
              <View style={InputStyle.container}>
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color={Colors.icon}
                  style={InputStyle.Icon}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="white"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={InputStyle.input}
                  secureTextEntry={false}
                />
              </View>

              {/* PASSWORD INPUT */}
              <View style={InputStyle.container}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={Colors.icon}
                  style={InputStyle.Icon}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  autoCorrect={false}
                  placeholderTextColor="white"
                  style={InputStyle.input}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={InputStyle.eyeIcon}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={Colors.icon}
                  />
                </TouchableOpacity>
              </View>

              {/* BUTTON */}
              <Pressable style={RegisterStyles.button}>
                <Text style={RegisterStyles.buttonText}>REGISTER</Text>
              </Pressable>

              {/* UNDERLINE */}
              <View style={RegisterStyles.underline}>
                <Text style={RegisterStyles.underlineText}>
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={RegisterStyles.underlineButton}
                >
                  <Text style={RegisterStyles.underlineButtonText}>
                    Sign in.
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const InputStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "auto",
    height: 60,
    width: 350,
    borderRadius: 5,
    color: Colors.white,
    backgroundColor: "rgba(35, 35, 37, 0.9)",
    borderWidth: 2,
    borderColor: "#323234",
    gap: 20,
    paddingLeft: 20,
  },
  Icon: {},
  input: {
    color: Colors.white,
    alignSelf: "center",
    width: 350,
    height: "100%",
    position: "absolute",
    paddingLeft: 65,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
});

const RegisterStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    marginTop: 65,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    gap: 20,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 50,
    marginTop: 110,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.orange,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  underline: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  underlineText: {
    color: Colors.white,
    fontSize: 16,
  },
  underlineButtonText: {
    color: Colors.orange,
    fontSize: 16,
  },
});
