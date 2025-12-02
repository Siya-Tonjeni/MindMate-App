import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName="splash"   // ⬅ starting screen
        screenOptions={{ headerShown: false }}
      >
        {/* TOP LEVEL ROUTES ONLY */}
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />

        {/* modal route stays */}
        <Stack.Screen 
          name="modal" 
          options={{ presentation: "modal", headerShown: true }} 
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
