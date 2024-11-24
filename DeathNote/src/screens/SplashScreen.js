import React, { useEffect } from "react";
import { Image, StyleSheet, Text, SafeAreaView, View } from "react-native";
import { useAuth } from "../context/AuthContext";


const SplashScreen = ({navigation}) => {

  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(user ? "HomeScreen" : "LoginScreen");
    }, 4000);
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>DeathNote</Text>
        <Text style={styles.subtitle}>Leave note before you die!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures SafeAreaView takes up the entire screen
    backgroundColor: "black", // Maintains the background color for the SafeAreaView
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
  },
  title: {
    color: "white",
    fontSize: 40,
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#f64f59",
    fontSize: 20,
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default SplashScreen;
