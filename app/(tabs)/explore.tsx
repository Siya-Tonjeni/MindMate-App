import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}>MindMate Explore</Text>
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
    color: "#f3f3f3"
  },
});
