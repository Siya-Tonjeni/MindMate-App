import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen2() {
  const handleSkip = () => router.push("/auth");
  const handleNext = () => router.push("/splash3");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#A8E6CF", "#BFA5F1", "#6E5F8B"]}
        locations={[0.2, 0.45, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <BlurView intensity={30} tint="light" style={styles.blurOverlay} />

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/neutral.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <BlurView intensity={70} tint="light" style={styles.glassCard}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Understand Your Emotions Daily</Text>
          <Text style={styles.description}>
            Log your mood, identify emotional patterns, and gain insight into
            what truly affects your mental well-being.
          </Text>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.glassButton}
              activeOpacity={0.85}
              onPress={handleSkip}>
              <BlurView intensity={45} tint="light" style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.glassButton}
              activeOpacity={0.85}
              onPress={handleNext}>
              <BlurView intensity={45} tint="light" style={styles.nextButton}>
                <Text style={styles.nextText}>Next</Text>
              </BlurView>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    gap: 12,
    zIndex: 2,
  },
  logo: {
    width: 300,
    height: 300,
  },
  illustration: {
    width: 140,
    height: 140,
    position: "absolute",
    left: 260,
    top: 215,
  },
  glassCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 90,
    paddingHorizontal: 42,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    overflow: "hidden",
    zIndex: 3,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F2937",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#1E1E1E",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  activeDot: {
    backgroundColor: "#4A90E2",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  glassButton: {
    flex: 1,
  },
  skipButton: {
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  nextButton: {
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(74, 144, 226, 0.4)",
  },
  skipText: {
    color: "#1F2937",
    fontWeight: "600",
  },
  nextText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
