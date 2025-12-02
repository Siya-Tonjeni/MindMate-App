import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      password !== confirmPassword ||
      loading
    );
  }, [name, email, password, confirmPassword, loading]);

  const handleSignup = () => {
    if (isDisabled) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/onboarding/step1');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A8E6CF', '#BFA5F1', '#6E5F8B']}
        locations={[0.2, 0.45, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <BlurView intensity={30} tint="light" style={styles.blurOverlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/calm.png')}
            style={styles.brain}
            resizeMode="contain"
          />
        </View>

        <BlurView intensity={75} tint="light" style={styles.glassCard}>
          <View style={styles.form}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Get personalized insights and stay consistent with MindMate.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Serena Williams"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@email.com"
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="At least 8 characters"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                placeholder="Repeat password"
                secureTextEntry
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <TouchableOpacity
              style={[styles.ctaButton, isDisabled && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isDisabled}
              activeOpacity={0.9}>
              <BlurView intensity={40} tint="light" style={styles.ctaInner}>
                <Text style={styles.ctaText}>
                  {loading ? 'Creating account…' : 'Sign up'}
                </Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/auth/login")}
              >
              <Text style={styles.secondaryText}>
                Already have an account? <Text style={styles.link}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.18)',
    zIndex: 1,
  },
  flex: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 12,
    zIndex: 2,
  },
  logo: {
    width: 220,
    height: 200,
  },
  brain: {
    position: "absolute",
    left: 20,
    width: 100,
    height: 100,
    top: 123,
  },
  glassCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    zIndex: 3,
  },
  form: {
    gap: 16,
    zIndex: 4
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#F8FAFC',
  },
  ctaButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  ctaInner: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(139,92,246,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryText: {
    color: '#475569',
    fontSize: 14,
  },
  link: {
    color: '#7C3AED',
    fontWeight: '700',
  },
});

