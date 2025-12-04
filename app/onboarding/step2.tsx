import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, SafeAreaView, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Slider } from "@miblanchard/react-native-slider"; // Beautiful smooth slider
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function OnboardingStep2() {
  const router = useRouter();

  const [data, setData] = useState({
    overwhelmed: 0,
    sleep: 0,
    overthink: 0,
    isolated: 0,
  });

  const labels = ["Never", "Rarely", "Sometimes", "Often", "Always"];

  const handleChange = (key: string, val: number | number[]) => {
    setData({ ...data, [key]: Array.isArray(val) ? val[0] : val });
  };

  return (
    <LinearGradient
      colors={["#D1F3E3", "#A5D4F9"]}
      style={styles.container}
    >
      {/* Top content */}
      <View style={styles.top}>

{/* Back Button */}
<TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
  accessibilityRole="button"
>
  <View style={styles.backCircle}>
    <Text style={styles.backChevron}>‹</Text>
  </View>
  <Text style={styles.backText}>Back</Text>
</TouchableOpacity>

{/* Step indicator */}
<View style={styles.stepBadge}>
  <Text style={styles.stepText}>3 OF 3</Text>
</View>

</View>

      {/* Brain Illustration */}
      <Image
        source={require("../../assets/images/calm.png")} // Replace with your image
        style={styles.brain}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>How often do{"\n"}you experience{"\n"}the following?</Text>

      {/* Questions */}
      <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.list}>
        {[
          { key: "overwhelmed", label: "I feel overwhelmed" },
          { key: "sleep", label: "I find it hard to sleep" },
          { key: "overthink", label: "I overthink often" },
          { key: "isolated", label: "I feel isolated" },
        ].map(item => (
          <BlurView intensity={40} tint="light" style={styles.card} key={item.key}>
            <Text style={styles.question}>{item.label}</Text>

            <Slider
              value={data[item.key]}
              onValueChange={val => handleChange(item.key, val)}
              minimumValue={0}
              maximumValue={4}
              step={1}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
            />

            <View style={styles.labelRow}>
              {labels.map((t, i) => (
                <Text key={i} style={styles.label}>
                  {t}
                </Text>
              ))}
            </View>
          </BlurView>
        ))}
      </View>

      

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.replace("/onboarding/step3")}
      >
        <LinearGradient
          colors={["#A6C6F9", "#7CA8F3"]}
          style={styles.nextGradient}
        >
          <Text style={styles.nextText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>

      {/* small decorative circles */}
      <View pointerEvents="none" style={styles.decorative}>
        <View style={[styles.dot, styles.dotPeach]} />
        <View style={[styles.dot, styles.dotYellow]} />
        <View style={[styles.dot, styles.dotPurple]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 120 },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 26 : 15,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  backChevron: {
    fontSize: 20,
    color: "#2C3E50",
    marginLeft: 2,
  },
  backText: {
    marginLeft: 8,
    color: "#2C3E50",
    fontWeight: "600",
  },

  stepBadge: {
    backgroundColor: "rgba(74,144,226,0.25)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stepText: {
    color: "#f3f3f3",
    fontWeight: "600",
  },

  progressBox: {
    backgroundColor: "rgba(74,144,226,0.25)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontWeight: "600",
    opacity: 0.7,
  },

  brain: {
    width: 200,
    height: 200,
    alignSelf: "center",
    // marginTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#2C3E50",
    // marginTop: 10,
  },

  list: {
    margin: 20,
    gap: 18,
  },

  card: {
    padding: 18,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  question: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B1B1B",
  },

  track: {
    height: 6,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  thumb: {
    width: 22,
    height: 22,
    backgroundColor: "#fff",
    borderRadius: 11,
    elevation: 4,
  },

  labelRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 11,
    opacity: 0.7,
  },

  nextButton: {
    marginTop: 30,
    alignSelf: "center",
    width: "80%",
    borderRadius: 40,
    overflow: "hidden",
  },

  nextGradient: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
  },

  nextText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },

  decorative: {
    position: "absolute",
    right: 26,
    top: 160,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginVertical: 12,
    opacity: 0.95,
  },
  dotPeach: {
    backgroundColor: "#F7A9A0",
  },
  dotYellow: {
    position: "absolute",
    right: 300,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F7E3A0",
    marginVertical: 6,
  },
  dotPurple: {
    position: "absolute",
    top: 120,
    right: 40,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#B89BF0",
    marginVertical: 6,
  },
});
