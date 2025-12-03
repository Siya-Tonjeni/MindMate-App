import { Tabs } from "expo-router";
import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? "light"].tint;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,

          // --- NEW MODERN GLASS TAB BAR ---
          tabBarBackground: () => (
            <BlurView
              intensity={45}
              tint={colorScheme === "dark" ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ),

          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 35,

            // Transparent background so BlurView shows through
            backgroundColor: "rgba(255,255,255,0.12)",

            overflow: "hidden",
            borderCurve: "continuous",

            // Modern shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 15,

            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            borderTopWidth: 0,
          },

          tabBarActiveTintColor: "#A8E6CF",
          tabBarInactiveTintColor:
            colorScheme === "dark" ? "rgba(255,255,255,0.5)" : "#777",

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="journal"
          options={{
            title: "Journal",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="calendar" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="person" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
