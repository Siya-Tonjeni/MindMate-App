import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function AuthScreen() {
    return (
        <View style={styles.container}>
          {/* Background Gradient */}
          <LinearGradient
            colors={["#A8E6CF", "#4A90E2", "#294F7C"]}
            locations={[0.3, 0.42, 1]}
            style={StyleSheet.absoluteFillObject}
          />
      
          {/* Blur overlay ABOVE gradient */}
          <BlurView intensity={40} tint="light" style={styles.blurOverlay} />
      
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
      
            <Image
              source={require("../assets/images/inlove 2.png")}
              style={styles.brain}
              resizeMode="contain"
            />
          </View>
      
          {/* Glass Card */}
          <BlurView intensity={60} tint="light" style={styles.glassCard}>
            <Text style={styles.title}>Let’s get to know you better</Text>
            <Text style={styles.subtitle}>
              This will help us tailor your experience
            </Text>
      
            <TouchableOpacity
              style={styles.glassButton}
              activeOpacity={0.85}
              onPress={() => router.push("/signup")}
            >
              <BlurView intensity={40} tint="light" style={styles.signupButton}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </BlurView>
            </TouchableOpacity>
      
            <TouchableOpacity
              style={styles.glassButton}
              activeOpacity={0.85}
              onPress={() => router.push("/login")}
            >
              <BlurView intensity={40} tint="light" style={styles.loginButton}>
                <Text style={styles.buttonText}>Log In</Text>
              </BlurView>
            </TouchableOpacity>
          </BlurView>
        </View>
      );      
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    blurOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.34)", // softer + cleaner glass
    },
  
    /* LOGO AREA */
    logoContainer: {
      alignItems: "center",
      zIndex: 2, 
    },
  
    logo: {
      width: 300,
      height: 300,
    //   marginTop: 70,
    },
  
    brain: {
      width: 250,
      height: 250,
      position: "absolute",
      right: -55,
      top: 165,
    },
  
    /* GLASS CARD */
    glassCard: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      paddingVertical: 70,
      paddingHorizontal: 44,
  
      borderTopLeftRadius: 200,
      borderTopRightRadius: 200,
      overflow: "hidden",
  
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.35)",
  
      zIndex: 3, // on top of everything
    },
  
    title: {
      fontSize: 45,
      fontWeight: "700",
      color: "#2C3E50",
      textAlign: "center",
      marginBottom: 6,
      lineHeight: 56,
    },
  
    subtitle: {
      fontSize: 15,
      color: "#000",
      textAlign: "center",
      marginBottom: 28,
    },
  
    /* GLASS BUTTONS */
    glassButton: {
      width: "100%",
      marginBottom: 14,
    },
  
    signupButton: {
      borderRadius: 20,
      paddingVertical: 16,
      alignItems: "center",
      backgroundColor: "rgba(74, 144, 226, 0.40)",
      overflow: "hidden",
    },
  
    loginButton: {
      borderRadius: 20,
      paddingVertical: 16,
      alignItems: "center",
      backgroundColor: "rgba(147, 164, 185, 0.20)",
      borderWidth: 1,
      borderColor: "rgba(241, 241, 241, 0.33)",
      overflow: "hidden",
    },
  
    buttonText: {
      fontSize: 17,
      fontWeight: "700",
      color: "#f3f3f3",
    },
  });
  