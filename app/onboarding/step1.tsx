import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  AccessibilityRole,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

type Option = {
  id: string;
  label: string;
};

const OPTIONS: Option[] = [
  { id: "anxiety", label: "I want to manage anxiety" },
  { id: "depression", label: "I struggle with depression" },
  { id: "selfesteem", label: "I want to improve my self-esteem" },
  { id: "stress", label: "I need help with stress" },
  { id: "mood", label: "I want to track my moods" },
  { id: "exploring", label: "Just exploring" },
];

export default function OnboardingStep1(): JSX.Element {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleNext = () => {
    if (!selected) return;
    // Save selection -> to state, context, or send to backend here
    // Example: router.push('/onboarding/step2')
    router.push("/onboarding/step2"); // change route to your next onboarding screen
  };

  const renderOption = ({ item }: { item: Option }) => {
    const isActive = item.id === selected;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.optionRow}
        onPress={() => handleSelect(item.id)}
        accessibilityRole={"radio" as AccessibilityRole}
        accessibilityState={{ selected: isActive }}
      >
        <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
          {isActive && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.optionLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#CFF6EA", "#A8E6CF", "#8FBEEA"]}
        locations={[0, 0.18, 1]}
        style={styles.gradient}
      />

      {/* decorative blur overlay for a soft look */}
      <BlurView intensity={18} tint="light" style={StyleSheet.absoluteFill} />

      {/* top content */}
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <View style={styles.backCircle}>
            <Text style={styles.backChevron}>‹</Text>
          </View>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.progressPill}>
          <Text style={styles.progressText}>1 OF 3</Text>
        </View>

        <Image
          source={require("../../assets/images/calm.png")}
          style={styles.brain}
          resizeMode="contain"
        />
      </View>

      {/* title */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>What brings{'\n'}you here?</Text>
      </View>

      {/* options list */}
      <View style={styles.optionsWrap}>
        <FlatList
          data={OPTIONS}
          keyExtractor={(i) => i.id}
          renderItem={renderOption}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>

      {/* Next button (glass) */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleNext}
          disabled={!selected}
          accessibilityRole="button"
          accessibilityState={{ disabled: !selected }}
          style={{ width: "100%" }}
        >
          <BlurView
            intensity={60}
            tint="light"
            style={[
              styles.nextButton,
              !selected && styles.nextButtonDisabled,
            ]}
          >
            <Text style={[styles.nextText, !selected && styles.nextTextDisabled]}>
              Next
            </Text>
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* small decorative circles */}
      <View pointerEvents="none" style={styles.decorative}>
        <View style={[styles.dot, styles.dotPeach]} />
        <View style={[styles.dot, styles.dotYellow]} />
        <View style={[styles.dot, styles.dotPurple]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#A8E6CF",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  top: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 26 : 12,
    zIndex: 2,
  },

  backButton: {
    position: "absolute",
    left: 18,
    top: Platform.OS === "android" ? 34 : 18,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  backChevron: {
    fontSize: 20,
    color: "#2C3E50",
    marginLeft: 2,
  },
  backText: {
    marginLeft: 8,
    color: "#2C3E50",
    fontWeight: "600",
  },

  progressPill: {
    position: "absolute",
    right: 18,
    top: Platform.OS === "android" ? 34 : 18,
    backgroundColor: "rgba(74,144,226,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    color: "#f3f3f3",
    fontWeight: "700",
    fontSize: 12,
  },

  brain: {
    width: 200,
    height: 200,
    marginTop: 28,
  },

  titleWrap: {
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 45,
    fontWeight: "700",
    color: "#123443",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  optionsWrap: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    marginTop: 40,
    marginLeft: 40
    
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  radioOuterActive: {
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2C3E50",
  },
  optionLabel: {
    flex: 1,
    color: "#123443",
    fontSize: 16,
    lineHeight: 22,
  },

  footer: {
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === "android" ? 28 : 34,
    zIndex: 4,
  },
  nextButton: {
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.24)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 16,
  },
  nextTextDisabled: {
    color: "#374151",
  },

  decorative: {
    position: "absolute",
    right: 26,
    top: 160,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginVertical: 12,
    opacity: 0.95,
  },
  dotPeach: {
    backgroundColor: "#F7A9A0",
  },
  dotYellow: {
    position: "absolute",
    right: 300,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F7E3A0",
    marginVertical: 6,
  },
  dotPurple: {
    position: "absolute",
    top: 120,
    right: 40,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#B89BF0",
    marginVertical: 6,
  },
});
