import { router, Tabs } from "expo-router";
import React from "react";
import { View, Platform, StyleSheet, TouchableOpacity } from "react-native";
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
            bottom: 0,
            left: 20,
            right: 20,
            height: 80,           
            borderRadius: 35,
            overflow: "visible",  
            backgroundColor: "rgba(255,255,255,0.12)",
            alignContent: "center",
          
            // soften edges on Android/iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 15,
          
            // room for iOS safe area + visual spacing
            paddingBottom: Platform.OS === "ios" ? 22 : 10,
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
          name="add"
          options={{
            title: "",
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => router.push("/add")}
                style={styles.addButtonContainer}
              >
                <View style={styles.addButton}>
                  <IconSymbol name="plus" size={26} color="#fff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="goals"
          options={{
            title: "My Goals",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="target" color={color} />
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

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    top: -34,           
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,        
    elevation: 20,       
  },

  addButton: {
    width: 66,
    height: 66,
    borderRadius: 38,
    backgroundColor: "rgb(79, 143, 246)",
    alignItems: "center",
    justifyContent: "center",

    // depth so it looks floating
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 20,
  }, 
});