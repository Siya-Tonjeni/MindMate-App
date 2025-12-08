import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function MyGoalsScreen() {
  const sections = [
    {
      id: "morning",
      label: "Morning",
      icon: <IconSymbol size={20} name="sunrise" color="#0f766e" />, // teal
      title: "Reduce Social Anxiety",
      duration: "22 Minutes",
      color: ["#CCFBF1", "#99F6E4"],
      illustration: require("../../assets/images/emotions/happy.png"),
    },
    {
      id: "day",
      label: "Day",
      icon: <IconSymbol  size={20} name="sunset" color="#0f766e" />, // teal
      title: "Build Healthy Eating Habits",
      duration: "16 Minutes",
      color: ["#E9D5FF", "#D8B4FE"],
      illustration: require("../../assets/images/emotions/sad.png"),
    },
    {
      id: "night",
      label: "Night",
      icon: <IconSymbol  size={20} name="moon" color="#0f766e" />, // teal
      title: "Improve Self-Compassion",
      duration: "24 Minutes",
      color: ["#DBEAFE", "#BFDBFE"],
      illustration: require("../../assets/images/emotions/happy.png"),
    },
  ];

  return (
    <LinearGradient 
    colors={["#A8E6CF", "#4A90E2", "#294F7C"]}
    locations={[0.2, 0.75, 1]} 
    style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Goals</Text>
          <Text style={styles.headerDate}>Today, {new Date().toLocaleDateString()}</Text>
        </View>
        <IconSymbol  size={26} name="bell" color="gray" />
      </View>

      {/* Sections */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        {sections.map((sec, index) => (
          <View key={sec.id} style={styles.sectionContainer}>
            <View style={styles.iconColumn}>
              {sec.icon}
              {index < sections.length - 1 && <View style={styles.verticalLine} />}
            </View>

            <LinearGradient colors={sec.color as [string, string]}  style={styles.card}>
              <Text style={styles.sectionLabel}>{sec.label}</Text>

              <View style={styles.contentRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>{sec.title}</Text>
                  <Text style={styles.sectionDuration}>{sec.duration}</Text>
                </View>

                <Image source={sec.illustration} style={styles.illustration} />
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#134e4a",
  },
  headerDate: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  sectionContainer: {
    flexDirection: "row",
    marginBottom: 35,
  },
  iconColumn: {
    alignItems: "center",
    width: 40,
  },
  verticalLine: {
    width: 2,
    height: 80,
    backgroundColor: "#d1d5db",
    marginTop: 8,
  },
  card: {
    flex: 1,
  padding: 18,
  borderRadius: 20,
  overflow: "visible",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1f2937",
  },
  contentRow: {
    flexDirection: "row",
  alignItems: "center",
  position: "relative",
  minHeight: 80,
  overflow: "visible",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  sectionDuration: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },
  illustration: {
    width: 100,
  height: 120,
  resizeMode: "contain",
  position: "absolute",
  right: -20,   // pushes it outside the card
  top: -25, 
  },
});
