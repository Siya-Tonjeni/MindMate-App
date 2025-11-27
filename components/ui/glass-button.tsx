import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

interface GlassButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const GlassButton = ({ label, onPress, disabled, style }: GlassButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
      style={[{ width: "100%" }, style]}
    >
      <BlurView intensity={45} tint="light" style={styles.glass}>
        <Text style={[styles.text, disabled && styles.disabledText]}>{label}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glass: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    // Glass effect
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
  },
  text: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledText: {
    opacity: 0.6,
  },
});
