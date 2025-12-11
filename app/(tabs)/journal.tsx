import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router } from "expo-router"; 

export default function JournalScreen() {
  type Journal = {
    id: string;
    title: string;
    date: string;
    pinned: boolean;
  };
  
  const [journals, setJournals] = useState([
    { id: "1", title: "Feeling hopeful today", date: "2025-02-10", pinned: true },
    { id: "2", title: "Struggled with anxiety", date: "2025-02-09", pinned: false },
    { id: "3", title: "Had a productive day", date: "2025-02-08", pinned: false },
  ]);

  const addJournal = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: "New Journal Entry",
      date: new Date().toISOString().split("T")[0],
      pinned: false,
    };
    setJournals([newEntry, ...journals]);
  };

  const deleteJournal = (id: string) => {
    Alert.alert("Delete Entry", "Are you sure you want to delete this journal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setJournals(journals.filter((j) => j.id !== id)),
      },
    ]);
  };

  const togglePin = (id: string) => {
    setJournals((prev) => {
      return prev
        .map((j) => (j.id === id ? { ...j, pinned: !j.pinned } : j))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned));
    });
  };

  const renderItem = ({ item } : {item: Journal}) => (
    <View style={styles.cardContainer}>
      <LinearGradient 
      colors={["#DBEAFE", "#BFDBFE"]} 
      style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => togglePin(item.id)}>
            <IconSymbol size={22} name='pin' color={item.pinned ? "#0f766e" : "#9ca3af"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDate}>{item.date}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity>
            <IconSymbol size={20} name='pencil' color="#115e59" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteJournal(item.id)}>
            <IconSymbol size={20} name='trash' color="#dc2626" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient 
    colors={["#A8E6CF", "#4A90E2", "#294F7C"]} 
    locations={[0.2, 0.75, 1]} 
    style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Journal</Text>
        </View>
        <IconSymbol  style={styles.notificationBell} size={26} name="bell" color="gray" />
        {/* link to profile */}
        <TouchableOpacity style={styles.avatarWrap} onPress={() => router.push("/(tabs)/profile")}> 
              {/* user profile picture */}
              <Image source={require("../../assets/images/profile-picture.png")} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={addJournal}>
            <IconSymbol size={26} name='plus' color="white" />
            <Text style={styles.addButtonText}>New Entry</Text>
      </TouchableOpacity>
      <FlatList
        data={journals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#134e4a",
    marginBottom: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14b8a6",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },

  notificationBell: {
    position: "relative",
    left: 45,
  },

  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 50, height: 50, borderRadius: 50,},

  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  cardDate: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
});
