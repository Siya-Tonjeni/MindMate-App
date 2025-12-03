import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router"; // remove if you don't use expo-router

const { width } = Dimensions.get("window");

type Period = "Week" | "Month" | "Year";

export default function HomePage(): JSX.Element {
  const [mood, setMood] = useState("HAPPY");
  const [period, setPeriod] = useState<Period>("Week");
  const scaleAnim = useRef(new Animated.Value(1)).current;

const [moodImage, setMoodImage] = useState(require("../../assets/images/emotions/happy.png"));

const pulseAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  loadMood();
}, []);

const loadMood = async () => {
  const savedMood = await AsyncStorage.getItem("userMood");

  if (savedMood) {
    const parsed = JSON.parse(savedMood);
    setMood(parsed.label);
    setMoodImage(parsed.image);

    // pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }
};


  // Dummy data for chart (7 days)
  const sampleBars = [
    { day: "Mon", value: 70, color: "#4A90E2" },
    { day: "Tue", value: 45, color: "#F7A9A0" },
    { day: "Wed", value: 85, color: "#F6D365" },
    { day: "Thu", value: 60, color: "#4A90E2" },
    { day: "Fri", value: 90, color: "#F6D365" },
    { day: "Sat", value: 30, color: "#F7A9A0" },
    { day: "Sun", value: 55, color: "#4A90E2" },
  ];

  const onMoodPress = () => {
    // quick scale animation for the mood badge
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.06, duration: 150, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    // navigate to mood detail or tracker
    // router.push("/mood/detail"); // uncomment if using expo-router
  };

  const onQuickAction = (action: string) => {
    // handle quick actions (journal, breathe, habits)
    // router.push(`/action/${action}`); // example
    console.log("quick action:", action);
  };

  return (
    <LinearGradient colors={["#C8E5E9", "#A5C7E2"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.welcomeSmall}>Welcome to MindMate,</Text>
              <Text style={styles.welcomeLarge}>Siyamtanda</Text>
            </View>

            {/* link to profile */}
            <TouchableOpacity style={styles.avatarWrap} onPress={() => router.push("/(tabs)/profile")}> 
              {/* user profile picture */}
              <Image source={require("../../assets/images/profile-picture.png")} style={styles.avatar} />
            </TouchableOpacity>
          </View>

          {/* --- Mood Check-In Summary Section --- */}
<View style={styles.checkinSection}>
  <View style={styles.checkinHeaderRow}>
    <Text style={styles.checkinTitle}>Today’s Check-In</Text>
    <TouchableOpacity onPress={() => router.push("/onboarding/step2")}>
      <Text style={styles.changeMoodText}>Update</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.checkinCard}>
    <BlurView intensity={50} tint="light" style={styles.checkinGlass}>

      <View style={styles.checkinLeft}>
        <Text style={styles.checkinLabel}>You feel</Text>
        <Animated.Text 
          style={[
            styles.checkinMood,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          {mood}
        </Animated.Text>
      </View>

      <Animated.Image
        source={moodImage}
        resizeMode="contain"
        style={[
          styles.checkinImage,
          { transform: [{ scale: pulseAnim }] }
        ]}
      />
      
    </BlurView>
  </View>
</View>


          {/* Mood Tracker Card */}
          <BlurView intensity={50} tint="light" style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleWrap}>
                <View style={styles.dot} />
                <Text style={styles.cardTitle}>Mood Tracker</Text>
              </View>

              <View style={styles.periodTabs}>
                {(["Week", "Month", "Year"] as Period[]).map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => setPeriod(p)}
                    style={[styles.periodBtn, period === p && styles.periodBtnActive]}
                  >
                    <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Chart area */}
            <View style={styles.chartWrap}>
              <View style={styles.chartBackground}>
                {/* Simple bar chart */}
                <View style={styles.barsRow}>
                  {sampleBars.map((b) => (
                    <View key={b.day} style={styles.barCol}>
                      <View style={[styles.bar, { height: `${b.value}%`, backgroundColor: b.color }]} />
                      <Text style={styles.barLabel}>{b.day}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </BlurView>

          {/* Quick actions */}
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickCard} onPress={() => onQuickAction("journal")}>
              <BlurView intensity={40} tint="light" style={styles.quickInner}>
                <Text style={styles.quickTitle}>Journal</Text>
                <Text style={styles.quickSubtitle}>Write a reflection</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} onPress={() => onQuickAction("breathe")}>
              <BlurView intensity={40} tint="light" style={styles.quickInner}>
                <Text style={styles.quickTitle}>Breathe</Text>
                <Text style={styles.quickSubtitle}>2-minute exercise</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} onPress={() => onQuickAction("habits")}>
              <BlurView intensity={40} tint="light" style={styles.quickInner}>
                <Text style={styles.quickTitle}>Habits</Text>
                <Text style={styles.quickSubtitle}>Track routines</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Recent Journal */}
          <BlurView intensity={40} tint="light" style={styles.recentCard}>
            <Text style={styles.recentTitle}>Recent journal</Text>
            <Text numberOfLines={3} style={styles.recentText}>
              Today I felt more focused after a short walk. Noticed my mood lifted when I took a break from screens...
            </Text>

            <View style={styles.recentFooter}>
              <Text style={styles.recentDate}>Today • 10:42</Text>
              {/* journal/1 */}
              <TouchableOpacity onPress={() => router.push("/splash/splash2")}>
                <Text style={styles.readMore}>Read</Text>
              </TouchableOpacity>
            </View>
          </BlurView>

          <View style={{ height: 80 }} />
        </ScrollView>

        {/* Floating New Entry button + bottom nav placeholder */}
        <View style={styles.footerWrap}>
            {/* journal/new */}
          <TouchableOpacity style={styles.fab} onPress={() => router.push("/splash/splash2")}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>

          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
              <Text style={styles.navTextActive}>Home</Text>
            </TouchableOpacity>
            {/* mood */}
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/splash/splash2")}>
              <Text style={styles.navText}>Mood</Text>
            </TouchableOpacity>
            {/* profile */}
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/splash/splash2")}>
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 120 },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  welcomeSmall: { color: "#3b5560", fontSize: 14, opacity: 0.85 },
  welcomeLarge: { color: "#122B33", fontSize: 22, fontWeight: "800", marginTop: 2 },

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

  moodRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },
  moodBadgeWrap: {
    flex: 0.5,
  },
  moodBadge: {
    width: 160,
    height: 80,
    borderRadius: 18,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  moodSmall: { fontSize: 12, color: "#28464E", opacity: 0.9 },
  moodBig: { fontSize: 22, fontWeight: "900", color: "#28464E", marginTop: 6 },

  brain: {
    position: "absolute",
    left: 120,
    bottom: -40,
    flex: 0.5, 
    width: 200, 
    height: 200, 
    alignSelf: "flex-end" 
  },

  checkinSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  
  checkinHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
  checkinTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#263A4F",
  },
  
  changeMoodText: {
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 15,
  },
  
  checkinCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  
  checkinGlass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  
  checkinLeft: {
    flexDirection: "column",
  },
  
  checkinLabel: {
    fontSize: 14,
    color: "#3A4B5C",
    opacity: 0.7,
  },
  
  checkinMood: {
    fontSize: 32,
    fontWeight: "800",
    color: "#263A4F",
    marginTop: -5,
  },
  
  checkinImage: {
    width: 150,
    height: 150,
  },
  

  card: {
    marginTop: 10,
    borderRadius: 18,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    overflow: "hidden",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitleWrap: { flexDirection: "row", alignItems: "center" },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#F77A7A", marginRight: 8 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#123443" },

  periodTabs: { flexDirection: "row" },
  periodBtn: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 14, marginLeft: 6 },
  periodBtnActive: { backgroundColor: "rgba(255,255,255,0.35)" },
  periodText: { color: "#2c5054" },
  periodTextActive: { fontWeight: "800", color: "#16343a" },

  chartWrap: { marginTop: 16 },
  chartBackground: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 16,
    justifyContent: "flex-end",
  },
  barsRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: "100%" },
  barCol: { width: (width - 96) / 12, alignItems: "center" },
  bar: { width: "100%", borderRadius: 10 },
  barLabel: { marginTop: 8, fontSize: 11, color: "#2c5054" },

  quickRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  quickCard: { width: "32%", borderRadius: 12, overflow: "hidden" },
  quickInner: { padding: 12, alignItems: "center" },
  quickTitle: { fontWeight: "800", color: "#153238" },
  quickSubtitle: { fontSize: 12, color: "#2c5054", marginTop: 4 },

  recentCard: {
    marginTop: 18,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  recentTitle: { fontWeight: "800", fontSize: 16, color: "#123443", marginBottom: 6 },
  recentText: { color: "#1b3b3e", opacity: 0.95, fontSize: 13 },
  recentFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" },
  recentDate: { color: "#2c5054" },
  readMore: { color: "#16343a", fontWeight: "700" },

  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "android" ? 18 : 28,
    alignItems: "center",
  },
  fab: {
    width: 66,
    height: 66,
    borderRadius: 34,
    backgroundColor: "#63B3ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: { color: "#fff", fontSize: 30, fontWeight: "800" },

  bottomNav: {
    width: "94%",
    height: 56,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  navItem: { alignItems: "center" },
  navText: { color: "rgba(20,30,35,0.6)" },
  navTextActive: { color: "#16343a", fontWeight: "800" },
});
