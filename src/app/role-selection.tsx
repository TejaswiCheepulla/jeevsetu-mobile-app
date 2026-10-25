import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const roles = [
  {
    id: 'user',
    icon: '🧑',
    title: 'General User',
    description: 'Report injured animals and track rescue requests.',
  },
  {
    id: 'vet',
    icon: '🩺',
    title: 'Veterinarian',
    description: 'Provide medical care and help animals recover.',
  },
  {
    id: 'volunteer',
    icon: '🤝',
    title: 'Volunteer',
    description: 'Join rescue efforts and help animals in need.',
  },
  {
    id: 'ngo',
    icon: '🏥',
    title: 'NGO / Rescue Organisation',
    description: 'Coordinate rescue teams and manage cases.',
  },
  {
    id: 'animal-lover',
    icon: '🐾',
    title: 'Animal Lover',
    description: 'Explore adoption, animal care and volunteering.',
  },
];

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐾</Text>
        </View>

        <Text style={styles.heading}>Welcome to JeevSetu</Text>

        <Text style={styles.subtitle}>
          Every life matters. Every helping hand counts.
        </Text>

        <Text style={styles.question}>How would you like to help?</Text>

        <Text style={styles.instruction}>
          Choose the option that best describes you.
        </Text>

        {roles.map((role) => {
          const isSelected = selectedRole === role.id;

          return (
            <Pressable
              key={role.id}
              onPress={() => setSelectedRole(role.id)}
              style={[
                styles.roleCard,
                isSelected && styles.selectedCard,
              ]}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.roleIcon}>{role.icon}</Text>
              </View>

              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>
                  {role.description}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  isSelected && styles.selectedRadio,
                ]}
              >
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          );
        })}

        <Pressable
          disabled={!selectedRole}
          onPress={() => {
  if (selectedRole) {
    router.push('/dashboard');
  }
}}
          style={[
            styles.continueButton,
            !selectedRole && styles.disabledButton,
          ]}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </Pressable>

        <Text style={styles.footer}>
          Together, we can make a difference. 💙
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 19,
    backgroundColor: '#142B5F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logo: {
    fontSize: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: '800',
    color: '#142B5F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    marginTop: 9,
    lineHeight: 21,
  },
  question: {
    alignSelf: 'flex-start',
    fontSize: 21,
    fontWeight: '700',
    color: '#142B5F',
    marginTop: 30,
  },
  instruction: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#667085',
    marginTop: 7,
    marginBottom: 18,
  },
  roleCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FD',
    borderWidth: 1.5,
    borderColor: '#E3EAF5',
    borderRadius: 17,
    padding: 14,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: '#2F5DAB',
    backgroundColor: '#EEF4FF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E8EFFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleIcon: {
    fontSize: 25,
  },
  roleTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  roleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#142B5F',
  },
  roleDescription: {
    fontSize: 12,
    color: '#667085',
    lineHeight: 17,
    marginTop: 4,
  },
  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#A8B4C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#2F5DAB',
  },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#2F5DAB',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 17,
    alignItems: 'center',
    backgroundColor: '#142B5F',
    borderRadius: 15,
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: '#A8B4C8',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    fontSize: 12,
    color: '#667085',
    marginTop: 20,
    textAlign: 'center',
  },
});