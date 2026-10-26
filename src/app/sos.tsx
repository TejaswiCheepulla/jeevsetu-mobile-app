
import { router } from 'expo-router';
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SOSScreen() {
  const openMaps = async () => {
    const url = 'https://www.google.com/maps/search/animal+rescue+veterinary+near+me';

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open maps', 'Please open Google Maps manually.');
    }
  };

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
        <Text style={styles.heading}>SOS Emergency</Text>
        <Text style={styles.subtitle}>
          Every second matters when an animal needs help.
        </Text>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>
            🚨 Is an animal in danger?
          </Text>
          <Text style={styles.alertText}>
            Keep yourself safe first. Stay away from traffic and
            frightened or aggressive animals. Contact a veterinarian
            or animal rescue service for urgent help.
          </Text>
        </View>

        <Pressable
          style={styles.reportButton}
          onPress={() => router.push('/animal-report')}
        >
          <Text style={styles.reportButtonText}>
            🆘 Report an Injured Animal
          </Text>
          <Text style={styles.buttonSubtext}>
            Create a report with the animal's details and photo
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Find Nearby Help</Text>

        <Pressable style={styles.actionCard} onPress={openMaps}>
          <Text style={styles.actionEmoji}>📍</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>
              Nearby Veterinarians & Rescue Services
            </Text>
            <Text style={styles.actionDescription}>
              Search for animal-care services on Google Maps.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>💙 Important to know</Text>
          <Text style={styles.noteText}>
            JeevSetu currently saves reports on this device.
            Submitting a report does not automatically contact
            rescuers. Please contact a local professional directly
            in an emergency.
          </Text>
        </View>

        <Text style={styles.footer}>
          Be kind. Stay safe. Save lives. 🐾
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },
  alertCard: {
    backgroundColor: '#FDECEC',
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#E53935',
  },
  alertTitle: {
    color: '#B42318',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alertText: {
    color: '#344054',
    fontSize: 14,
    lineHeight: 22,
  },
  reportButton: {
    backgroundColor: '#E53935',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 26,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#142B5F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
  },
  actionEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    color: '#142B5F',
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionDescription: {
    color: '#667085',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  arrow: {
    color: '#142B5F',
    fontSize: 26,
    marginLeft: 8,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginTop: 4,
  },
  noteTitle: {
    color: '#142B5F',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteText: {
    color: '#475467',
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 22,
  },
});
