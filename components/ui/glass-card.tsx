import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlassCard = ({ children, style }: Props) => {
  return (
    <BlurView intensity={60} tint="light" style={[styles.glass, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  glass: {
    borderRadius: 28,
    overflow: "hidden",

    // subtle transparency
    backgroundColor: "rgba(255, 255, 255, 0.28)",

    // border (frosted)
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",

    // shadow (soft pastel vibe)
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },

    padding: 0,
  },
  inner: {
    padding: 24,
  },
});
