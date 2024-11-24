import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("HomeScreen");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/background.png")} // Replace with your background image URL
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>

          {/* Email input with icon */}
          <View style={styles.inputContainer}>
            <Icon
              name="envelope"
              size={20}
              color="#f5a623"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Password input with icon */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#f5a623" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              keyboardType="default"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {/* Login button with icon */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Icon
              name="sign-in"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Register link */}
          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // SafeAreaView background is transparent
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark overlay for readability
    padding: 30,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Adds shadow for Android devices
  },
  header: {
    color: "#fff",
    marginBottom: 40,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 15,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#f64f59", // Bright accent color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  buttonIcon: {
    marginRight: 10, // Space between icon and text
  },
  registerLink: {
    marginTop: 25,
  },
  linkText: {
    color: "#12c2e9",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default LoginScreen;
