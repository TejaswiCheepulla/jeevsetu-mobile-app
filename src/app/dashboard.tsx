import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🐾 JeevSetu</Text>
        <Text style={styles.tagline}>Every Life Matters.</Text>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.title}>Welcome to JeevSetu!</Text>
        <Text style={styles.description}>
          Together, we can make a difference in the lives of animals.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>How can we help today?</Text>
      
<Pressable
  style={styles.actionCard}
  onPress={() => router.push('/my-reports')}
>
  <Text style={styles.actionTitle}>📋 My Reports</Text>
  <Text style={styles.actionDescription}>
    View your saved animal reports and case IDs.
  </Text>
</Pressable>
      <Pressable
  style={styles.actionCard}
  onPress={() => router.push('/animal-report')}
>
  <Text style={styles.actionTitle}>🆘 Animal Emergency</Text>
  <Text style={styles.actionDescription}>
    Help an injured animal by preparing a rescue report.
  </Text>
</Pressable>

      
<Pressable
  style={styles.actionCard}
  onPress={() => router.push('/animal-care')}
>
  <Text style={styles.actionTitle}>🐶 Animal Care</Text>
  <Text style={styles.actionDescription}>
    Learn how to care for animals and keep them safe.
  </Text>
</Pressable>


      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>💙 Rescue Support</Text>
        <Text style={styles.actionDescription}>
          Discover ways to support animal rescue efforts.
        </Text>
      </View>

      <Text style={styles.footer}>
        Every small act of kindness matters. 🐾
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    padding: 22,
  },
  header: {
    marginTop: 12,
    marginBottom: 28,
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#142B5F',
  },
  tagline: {
    fontSize: 13,
    color: '#667085',
    marginTop: 4,
  },
  welcomeCard: {
    backgroundColor: '#142B5F',
    borderRadius: 22,
    padding: 24,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172033',
    marginBottom: 14,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1E8F5',
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#142B5F',
    marginBottom: 7,
  },
  actionDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
  },
  footer: {
    textAlign: 'center',
    marginTop: 12,
    color: '#667085',
    fontSize: 13,
  },
});
// Testing dashboard editor