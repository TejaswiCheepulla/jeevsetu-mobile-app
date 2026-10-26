
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Easing,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SOSScreen() {
  const [description, setDescription] = useState('');
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  const pulse = useRef(new Animated.Value(1)).current;
  const holdProgress = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completed = useRef(false);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => {
      animation.stop();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pulse]);

  const startHold = () => {
    if (!description.trim()) {
      Alert.alert(
        'Describe the emergency',
        'Please enter a short description before continuing.'
      );
      return;
    }

    setHolding(true);
    setProgress(0);
    completed.current = false;

    holdProgress.setValue(0);

    Animated.timing(holdProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const startTime = Date.now();

    const updateProgress = () => {
      const value = Math.min((Date.now() - startTime) / 3000, 1);
      setProgress(value);

      if (value < 1) {
        timer.current = setTimeout(updateProgress, 50);
      } else {
        completed.current = true;
        setHolding(false);

        Alert.alert(
          'SOS confirmation',
          'Your emergency details are ready. JeevSetu does not send alerts to rescuers yet. Please contact a veterinarian or rescue service directly.',
          [
            { text: 'OK' },
            {
              text: 'Open rescue search',
              onPress: () =>
                Linking.openURL(
                  'https://www.google.com/maps/search/animal+rescue+veterinary+near+me'
                ).catch(() =>
                  Alert.alert('Unable to open maps')
                ),
            },
          ]
        );
      }
    };

    timer.current = setTimeout(updateProgress, 50);
  };

  const cancelHold = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;

    if (!completed.current) {
      setHolding(false);
      setProgress(0);
      holdProgress.stopAnimation();
      holdProgress.setValue(0);
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

        <View style={styles.header}>
          <Text style={styles.paw}>🐾</Text>
          <Text style={styles.brand}>
            <Text style={styles.brandBold}>Jeev</Text>Setu
          </Text>
        </View>

        <Text style={styles.location}>📍 Animal emergency assistance</Text>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>
            ⚠ IMPORTANT NOTICE
          </Text>
          <Text style={styles.noticeText}>
            JeevSetu is a community-support prototype, not an
            official emergency service. Alerts are not sent
            automatically to rescuers.
          </Text>
        </View>

        <View style={styles.sosArea}>
          <Animated.View
            style={[
              styles.glow,
              { transform: [{ scale: pulse }] },
            ]}
          >
            <Pressable
              onPressIn={startHold}
              onPressOut={cancelHold}
              accessibilityRole="button"
              accessibilityLabel="Hold SOS for three seconds"
              style={styles.sosButton}
            >
              <Text style={styles.sosText}>SOS</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.holdText}>
            {holding
              ? `Keep holding... ${Math.max(
                  0,
                  3 - Math.floor(progress * 3)
                )}s`
              : 'Hold for 3 seconds to continue'}
          </Text>

          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: holdProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.inputCard}>
          <TextInput
            value={description}
            onChangeText={(value) =>
              setDescription(value.slice(0, 100))
            }
            placeholder="Please describe the emergency"
            placeholderTextColor="#8A8A8A"
            multiline
            maxLength={100}
            style={styles.input}
          />
          <View style={styles.inputFooter}>
            <Text style={styles.mandatory}>Required field</Text>
            <Text style={styles.counter}>
              {description.length}/100
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.reportButton}
          onPress={() => router.push('/animal-report')}
        >
          <Text style={styles.reportText}>
            📋 Open Animal Report
          </Text>
        </Pressable>

        <Pressable
          style={styles.mapButton}
          onPress={() =>
            Linking.openURL(
              'https://www.google.com/maps/search/animal+rescue+veterinary+near+me'
            ).catch(() => Alert.alert('Unable to open maps'))
          }
        >
          <Text style={styles.mapText}>
            📍 Find nearby animal-care services
          </Text>
        </Pressable>

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
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F2F6FC',
    borderRadius: 10,
    marginBottom: 18,
  },
  backText: {
    color: '#142B5F',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  paw: {
    fontSize: 26,
    marginRight: 9,
  },
  brand: {
    color: '#7C8798',
    fontSize: 23,
    fontWeight: '500',
  },
  brandBold: {
    color: '#142B5F',
    fontWeight: '900',
  },
  location: {
    color: '#475467',
    fontSize: 15,
    marginBottom: 24,
  },
  notice: {
    backgroundColor: '#FFF6E5',
    borderColor: '#D9B76C',
    borderWidth: 1,
    padding: 15,
    marginBottom: 28,
  },
  noticeTitle: {
    color: '#91651D',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noticeText: {
    color: '#765C36',
    fontSize: 13,
    lineHeight: 20,
  },
  sosArea: {
    alignItems: 'center',
    marginVertical: 4,
  },
  glow: {
    width: 204,
    height: 204,
    borderRadius: 102,
    backgroundColor: '#F9D6D6',
    padding: 9,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  sosButton: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: '#D92323',
    borderWidth: 4,
    borderColor: '#C91E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 43,
    fontWeight: '900',
    letterSpacing: 1,
  },
  holdText: {
    color: '#858585',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 12,
  },
  progressTrack: {
    width: '80%',
    height: 5,
    backgroundColor: '#F2DADA',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D92323',
  },
  inputCard: {
    backgroundColor: '#F7F7F7',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    padding: 12,
    marginBottom: 18,
  },
  input: {
    minHeight: 58,
    backgroundColor: '#FFFFFF',
    padding: 12,
    color: '#172033',
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  mandatory: {
    color: '#A36D6D',
    fontSize: 12,
  },
  counter: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  reportButton: {
    backgroundColor: '#142B5F',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  reportText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mapButton: {
    borderWidth: 1,
    borderColor: '#D6DCE8',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  mapText: {
    color: '#142B5F',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: '#667085',
    marginTop: 22,
  },
});
