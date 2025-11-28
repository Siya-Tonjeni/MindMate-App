import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from "react-native";

export default function OnboardingStep2() {
  const moods = [
    {
      label: "HAPPY",
      image: require("../../assets/images/emotions/happy.png"),
    },
    {
      label: "SAD",
      image: require("../../assets/images/emotions/sad.png"),
    },
    {
      label: "CALM",
      image: require("../../assets/images/emotions/calm.png"),
    },
    {
      label: "ANXIOUS",
      image: require("../../assets/images/emotions/anxious.png"),
    },
    {
      label: "NEUTRAL",
      image: require("../../assets/images/emotions/neutral.png"),
    },
    {
      label: "INLOVE",
      image: require("../../assets/images/emotions/inlove.png"),
    },
    {
      label: "TIRED",
      image: require("../../assets/images/emotions/tired.png"),
    },
    {
      label: "INSPIRED",
      image: require("../../assets/images/emotions/inspired.png"),
    },
    {
      label: "ANGRY",
      image: require("../../assets/images/emotions/angry.png"),
    },
  ];

  const [index, setIndex] = useState(0);

  const nextMood = () => {
    setIndex((prev) => (prev + 1) % moods.length);
  };

  const prevMood = () => {
    setIndex((prev) => (prev - 1 + moods.length) % moods.length);
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;


  return (
    <LinearGradient
      colors={["#C8E5E9", "#A5C7E2", "#7FA0D6"]}
      style={styles.container}
    >
        <BlurView intensity={18} tint="light" style={StyleSheet.absoluteFill} />

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
    <Text style={styles.stepText}>2 OF 3</Text>
  </View>

</View>


      {/* Header */}
      <Text style={styles.title}>How are you</Text>
      <Text style={styles.title}>feeling today?</Text>

      {/* Brain Image */}
    <View style={styles.brainContainer}>
        <View style={styles.brainWrapper}>
            <Animated.View
            style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                transform: [
                { scale: scaleAnim },
                {
                    translateX: shakeAnim.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-12, 12],
                    }),
                },
                ],
            }}
            >
            <Image
                source={moods[index].image}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
            />
            </Animated.View>
        </View>
    </View>

      {/* Arrows */}
      <View style={styles.arrowsRow}>
        <TouchableOpacity style={styles.arrowBtn} onPress={prevMood}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowBtn} onPress={nextMood}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Glass mood button */}
      <TouchableOpacity
  style={styles.emotionButton}
  onPress={() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 90,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/onboarding/step1");
    });
  }}
>
  {/* <BlurView intensity={60} tint="light" style={styles.glassButton}> */}
    <Text style={styles.moodLabel}>{moods[index].label}</Text>
  {/* </BlurView> */}
</TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 40 : 20,
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

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#263A4F",
    textAlign: "center",
  },

  brainContainer: {
    marginTop: 20,
    width: 350,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },

  brainWrapper: {
    width: 350, // keep the brain visible but not too big
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  
    // makes the wrapper visible even before animation
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    borderRadius: 200,
  
    // subtle shadow depth
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },  
  
  brainImage: {
    width: "100%",
    height: "100%",
  },

  arrowsRow: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: -30,
    marginLeft: "auto",
    marginRight: "auto"
  },

  arrowBtn: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 22,
    color: "#2C3E50",
  },

  glassButton: {
    width: 200,
    paddingVertical: 14,
    borderRadius: 22,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
  },

  moodLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f3f3f3",
  },
  emotionButton: {
    marginTop: 50,
    backgroundColor: "rgba(186, 219, 225, 0.57)",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    margin: "auto",

    // subtle shadow depth
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 9 },
  },
});
