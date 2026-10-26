
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    AnimalReport,
    getReports,
} from '../utils/reportsStorage';

export default function MyReportsScreen() {
  const router = useRouter();
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = useCallback(async () => {
    setLoading(true);

    try {
      const savedReports = await getReports();
      setReports(savedReports);
    } catch {
      Alert.alert(
        'Unable to load reports',
        'Please try opening My Reports again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports])
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return '#E53935';
      case 'high':
        return '#E87524';
      case 'medium':
        return '#D69E00';
      default:
        return '#2E8B57';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>My Reports 🐾</Text>
        <Text style={styles.headerSubtitle}>
          Reports submitted from this device
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2F5DAB" />
          <Text style={styles.helperText}>Loading reports...</Text>
        </View>
      ) : reports.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>🐶 🐱</Text>
          <Text style={styles.emptyTitle}>No reports yet</Text>
          <Text style={styles.helperText}>
            Animal reports you save will appear here.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/animal-report')}
          >
            <Text style={styles.primaryButtonText}>
              Report an Animal
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.countText}>
            {reports.length} saved report
            {reports.length === 1 ? '' : 's'}
          </Text>

          {reports.map((report) => (
            <View key={report.caseId} style={styles.card}>
              {report.photoUri ? (
                <Image
                  source={{ uri: report.photoUri }}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ) : null}

              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <Text style={styles.animalTitle}>
                    {report.animal}
                  </Text>

                  <View
                    style={[
                      styles.urgencyBadge,
                      {
                        backgroundColor: getUrgencyColor(
                          report.urgency
                        ),
                      },
                    ]}
                  >
                    <Text style={styles.urgencyText}>
                      {report.urgency}
                    </Text>
                  </View>
                </View>

                <Text style={styles.caseId}>
                  Case ID: {report.caseId}
                </Text>

                <Text style={styles.description}>
                  {report.description}
                </Text>

                <Text style={styles.detail}>
                  📍 {report.location}
                </Text>

                <Text style={styles.detail}>
                  📞 {report.contact}
                </Text>

                <Text style={styles.savedNote}>
                  Saved on this device · Not sent to rescue team
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F6FC',
  },
  header: {
    backgroundColor: '#142B5F',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#DCE6FA',
    fontSize: 14,
    marginTop: 5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: 14,
  },
  emptyTitle: {
    color: '#172033',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  helperText: {
    color: '#667085',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2F5DAB',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 22,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
    paddingBottom: 30,
  },
  countText: {
    color: '#667085',
    fontSize: 14,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  photo: {
    width: '100%',
    height: 190,
    backgroundColor: '#E8EDF5',
  },
  cardContent: {
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  animalTitle: {
    color: '#142B5F',
    fontSize: 21,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  urgencyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caseId: {
    color: '#667085',
    fontSize: 12,
    marginTop: 7,
  },
  description: {
    color: '#172033',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  detail: {
    color: '#475467',
    fontSize: 14,
    marginTop: 9,
  },
  savedNote: {
    color: '#667085',
    fontSize: 11,
    marginTop: 14,
  },
});
