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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || loading;
  }, [email, password, loading]);

  const handleLogin = () => {
    if (isDisabled) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A8E6CF', '#4A90E2', '#294F7C']}
        locations={[0.2, 0.45, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <BlurView intensity={30} tint="light" style={styles.blurOverlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/inspired.png')}
            style={styles.brain}
            resizeMode="contain"
          />
        </View>

        <BlurView intensity={75} tint="light" style={styles.glassCard}>
          <View style={styles.form}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to keep tracking your wellness journey.
            </Text>

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
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <TouchableOpacity style={styles.forgotButton} activeOpacity={0.8}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ctaButton, isDisabled && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isDisabled}
              activeOpacity={0.9}>
              <BlurView intensity={40} tint="light" style={styles.ctaInner}>
                <Text style={styles.ctaText}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/signup')}>
              <Text style={styles.secondaryText}>
                New to MindMate? <Text style={styles.link}>Create account</Text>
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
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
    zIndex: 2,
  },
  logo: {
    width: 220,
    height: 220,
  },
  brain: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 150,
    left: 20
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
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#64748B',
    fontWeight: '600',
  },
  ctaButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  ctaInner: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(74,144,226,0.4)',
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
    color: '#2563EB',
    fontWeight: '700',
  },
});

