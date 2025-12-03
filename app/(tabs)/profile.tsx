import React, {useState, useEffect, useRef} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {

  const [mood, setMood] = useState("HAPPY");
  const pulseAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  loadMood();
}, []);

const loadMood = async () => {
  const savedMood = await AsyncStorage.getItem("userMood");

  if (savedMood) {
    const parsed = JSON.parse(savedMood);
    setMood(parsed.label);

    // pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }
};

  return (
    <LinearGradient
      colors={["#A8E6CF", "#BFA5F1", "#6E5F8B"]}
      style={styles.container}
    >
      <BlurView intensity={25} tint="light" style={StyleSheet.absoluteFill} />

      {/* Header */}
      <Text style={styles.header}>Your Profile</Text>

      {/* Profile Picture */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/profile-picture.png")}
          style={styles.avatar}
        />

        {/* Edit Pencil */}
        <TouchableOpacity style={styles.editButton}>
        <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Glass Info Card */}
      <BlurView intensity={50} tint="light" style={styles.infoCard}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Siya Tonjeni</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>your.email@mail.com</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Mood Today</Text>
        <Text style={styles.valueHighlight}>{mood}</Text>
      </BlurView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/splash')}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 25 },

  backButton: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  backIcon: {
    fontSize: 30,
    color: "#2C3E50",
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "600",
  },

  header: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#263A4F",
    marginTop: 10,
    marginBottom: 30,
  },

  avatarContainer: {
    alignSelf: "center",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginBottom: 40,
  },

  avatar: {
    width: "95%",
    height: "95%",
    borderRadius: 80,
  },

  editButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.65)",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  infoCard: {
    width: "100%",
    padding: 22,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.22)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },

  label: {
    fontSize: 14,
    color: "#2C3E50",
    opacity: 0.7,
    marginBottom: 4,
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    color: "#243447",
    fontWeight: "600",
    marginBottom: 10,
  },

  valueHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A7FDB",
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 8,
  },

  logoutBtn: {
    marginTop: 40,
    alignSelf: "center",
    width: 180,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C3E50",
  },
});
