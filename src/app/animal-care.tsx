
import { router } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const careGuides = [
  {
    emoji: '🐕',
    title: 'Dogs',
    description: 'Learn how to respond when you find an injured dog.',
    color: '#EAF1FF',
    animal: 'Dog',
  },
  {
    emoji: '🐈',
    title: 'Cats',
    description: 'Understand safe handling and basic precautions.',
    color: '#F3EAFE',
    animal: 'Cat',
  },
  {
    emoji: '🐄',
    title: 'Cows',
    description: 'Help an injured cow while keeping a safe distance.',
    color: '#E8F7EE',
    animal: 'Cow',
  },
  {
    emoji: '🐦',
    title: 'Birds',
    description: 'Learn what to do if you find an injured bird.',
    color: '#FFF3DF',
    animal: 'Bird',
  },
];

export default function AnimalCareScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.logo}>🐾 JeevSetu</Text>
        <Text style={styles.heading}>Animal Care</Text>
        <Text style={styles.subtitle}>
          Small acts of kindness can save lives.
          Learn how to help animals safely.
        </Text>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>
            🆘 Found an injured animal?
          </Text>
          <Text style={styles.warningText}>
            Keep a safe distance, avoid sudden movements,
            and contact a veterinarian or animal rescue service.
            Do not give food, water, or medicine to a seriously
            injured animal unless a professional advises you.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Choose an animal
        </Text>

        {careGuides.map((guide) => (
          <Pressable
            key={guide.animal}
            style={[
              styles.animalCard,
              { backgroundColor: guide.color },
            ]}
            onPress={() =>
              router.push({
                pathname: '/animal-care-guide',
                params: { animal: guide.animal },
              })
            }
          >
            <Text style={styles.emoji}>{guide.emoji}</Text>
            <View style={styles.animalInfo}>
              <Text style={styles.animalTitle}>
                {guide.title}
              </Text>
              <Text style={styles.animalDescription}>
                {guide.description}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <Text style={styles.footer}>
          Every life matters. 💙
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 18,
  },
  backText: {
    color: '#142B5F',
    fontSize: 15,
    fontWeight: '600',
  },
  logo: {
    color: '#2F5DAB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    color: '#142B5F',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 22,
  },
  warningCard: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 5,
    borderLeftColor: '#E53935',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  warningTitle: {
    color: '#B42318',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  warningText: {
    color: '#344054',
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    color: '#142B5F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  animalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 34,
    marginRight: 14,
  },
  animalInfo: {
    flex: 1,
  },
  animalTitle: {
    color: '#142B5F',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  animalDescription: {
    color: '#475467',
    fontSize: 13,
    lineHeight: 19,
  },
  arrow: {
    color: '#142B5F',
    fontSize: 28,
    marginLeft: 8,
  },
  footer: {
    textAlign: 'center',
    color: '#667085',
    marginTop: 18,
    fontSize: 14,
  },
});
