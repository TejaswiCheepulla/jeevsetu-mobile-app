
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnimalCareGuideScreen() {
  const { animal } = useLocalSearchParams<{ animal: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>
        {animal ?? 'Animal'} Care Guide
      </Text>

      
{animal === 'Dog' && (
  <View>
    <Text style={styles.sectionTitle}>What to do</Text>
    <Text style={styles.tip}>• Approach slowly and keep a safe distance.</Text>
    <Text style={styles.tip}>• Contact a veterinarian or local animal rescue team.</Text>
    <Text style={styles.tip}>• If there is heavy bleeding, seek urgent professional help.</Text>

    <Text style={styles.sectionTitle}>What to avoid</Text>
    <Text style={styles.tip}>• Do not corner, chase, or handle a frightened dog.</Text>
    <Text style={styles.tip}>• Do not give human medicines.</Text>
  </View>
)}

{animal === 'Cat' && (
  <View>
    <Text style={styles.sectionTitle}>What to do</Text>
    <Text style={styles.tip}>• Keep the surroundings quiet and safe.</Text>
    <Text style={styles.tip}>• Contact a veterinarian or animal rescue service.</Text>
    <Text style={styles.tip}>• Avoid handling the cat unless necessary for immediate safety.</Text>

    <Text style={styles.sectionTitle}>What to avoid</Text>
    <Text style={styles.tip}>• Do not grab a frightened cat with bare hands.</Text>
    <Text style={styles.tip}>• Never give human medicines.</Text>
  </View>
)}

{animal === 'Cow' && (
  <View>
    <Text style={styles.sectionTitle}>What to do</Text>
    <Text style={styles.tip}>• Stay clear of traffic and keep a safe distance.</Text>
    <Text style={styles.tip}>• Contact a veterinarian or local cattle rescue service.</Text>
    <Text style={styles.tip}>• Keep bystanders away if the cow is distressed.</Text>

    <Text style={styles.sectionTitle}>What to avoid</Text>
    <Text style={styles.tip}>• Do not approach the head or attempt to move a badly injured cow.</Text>
    <Text style={styles.tip}>• Do not administer medicines yourself.</Text>
  </View>
)}

{animal === 'Bird' && (
  <View>
    <Text style={styles.sectionTitle}>What to do</Text>
    <Text style={styles.tip}>• Keep people and pets away from the bird.</Text>
    <Text style={styles.tip}>• Contact a wildlife rescuer or veterinarian.</Text>
    <Text style={styles.tip}>• If advised by a professional, place the bird in a ventilated box in a quiet, shaded place.</Text>

    <Text style={styles.sectionTitle}>What to avoid</Text>
    <Text style={styles.tip}>• Do not force-feed or pour water into its beak.</Text>
    <Text style={styles.tip}>• Avoid unnecessary handling, especially for wild birds.</Text>
  </View>
)}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    padding: 24,
  },
  back: {
    color: '#142B5F',
    fontSize: 16,
    marginBottom: 28,
  },
  title: {
    color: '#142B5F',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    color: '#475467',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
  color: '#142B5F',
  fontSize: 19,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
},
tip: {
  color: '#344054',
  fontSize: 15,
  lineHeight: 23,
  marginBottom: 8,
},
});
