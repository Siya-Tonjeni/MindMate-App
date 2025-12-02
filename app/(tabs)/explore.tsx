import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthScreen from "../auth/auth";

export default function TabTwoScreen() {
  return (
    <>
    <View style={styles.container}>
      {/* <Text style={styles.text}>MindMate Explore</Text> */}
      <AuthScreen/>
    </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
