import { router } from 'expo-router';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  console.log('JEEVSETU HOME SCREEN LOADED');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐾</Text>
        </View>

        <Text style={styles.appName}>JeevSetu</Text>

        <Text style={styles.tagline}>
          Every Life Matters.
        </Text>

        <Text style={styles.description}>
          Connecting compassionate people with animals in need.
          Together, we can rescue, protect and care for every life.
        </Text>

        <View style={styles.illustration}>
          <Text style={styles.animalEmoji}>🐶 🐱</Text>
          <Text style={styles.illustrationText}>
            A little care can change a life.
          </Text>
        </View>

       <Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
  ]}
  onPress={() => router.push('/role-selection')}
>
  <Text style={styles.buttonText}>Get Started →</Text>
</Pressable>

        <Text style={styles.footer}>
          Rescue • Protect • Care
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: '#142B5F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logo: {
    fontSize: 43,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#142B5F',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2F5DAB',
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#667085',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: 320,
  },
  illustration: {
    width: '100%',
    backgroundColor: '#F2F6FC',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 38,
    marginBottom: 30,
  },
  animalEmoji: {
    fontSize: 55,
  },
  illustrationText: {
    color: '#142B5F',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#142B5F',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#2F5DAB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  footer: {
    color: '#667085',
    fontSize: 13,
    marginTop: 24,
    letterSpacing: 1,
  },
});
