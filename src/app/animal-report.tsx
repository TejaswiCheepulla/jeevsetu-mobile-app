import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveReport } from '../utils/reportsStorage';

const animalTypes = ['Dog', 'Cat', 'Cow', 'Bird', 'Other'];
const urgencyLevels = ['Low', 'Medium', 'High', 'Critical'];

export default function AnimalReportScreen() {
  const [animal, setAnimal] = useState('Dog');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [urgency, setUrgency] = useState('High');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const pickAnimalPhoto = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  } catch {
    Alert.alert(
      'Unable to select photo',
      'Something went wrong while opening your photo library. Please try again.'
    );
  }
};

const submitReport = async () => {
  if (!description.trim() || !location.trim() || !contact.trim()) {
    Alert.alert(
      'Missing information',
      'Please enter the situation, location, and contact number.'
    );
    return;
  }

  const caseId = `JS${Date.now().toString().slice(-6)}`;

  try {
    await saveReport({
      caseId,
      animal,
      description: description.trim(),
      location: location.trim(),
      contact: contact.trim(),
      urgency,
photoUri: photoUri,

    });

    Alert.alert(
      'Report saved! 🐾',
      `Case ID: ${caseId}\n\nAnimal: ${animal}\nUrgency: ${urgency}\n\nYour report has been saved on this device. It has not yet been sent to a rescue team.`,
      [{ text: 'OK' }]
    );
  } catch (error) {
    Alert.alert(
      'Unable to save report',
      'Something went wrong while saving your report. Please try again.'
    );
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>🐾 JeevSetu</Text>

        <Text style={styles.heading}>Animal Emergency Report</Text>
        <Text style={styles.subtitle}>
          Tell us about the animal that needs help.
        </Text>

        <Text style={styles.label}>1. What animal needs help?</Text>
        <View style={styles.options}>
          {animalTypes.map((type) => (
            <Pressable
              key={type}
              onPress={() => setAnimal(type)}
              style={[
                styles.option,
                animal === type && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  animal === type && styles.selectedOptionText,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
          <Text style={styles.label}>2. Add an animal photo (optional)</Text>

<Pressable
  style={styles.photoButton}
  onPress={pickAnimalPhoto}
>
  <Text style={styles.photoButtonText}>
    {photoUri ? 'Choose Another Photo' : '📷 Upload Animal Photo'}
  </Text>
</Pressable>

{photoUri && (
  <View style={styles.photoPreviewContainer}>
    <Image
      source={{ uri: photoUri }}
      style={styles.photoPreview}
      resizeMode="cover"
    />

    <Pressable
      style={styles.removePhotoButton}
      onPress={() => setPhotoUri(null)}
    >
      <Text style={styles.removePhotoText}>Remove Photo ✕</Text>
    </Pressable>
  </View>
)}
        <Text style={styles.label}>3. Describe the situation</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Where is the animal hurt? What happened?"
          placeholderTextColor="#8A94A6"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>4. Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter area, street, or nearby landmark"
          placeholderTextColor="#8A94A6"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>5. Your contact number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#8A94A6"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>6. How urgent is it?</Text>
        <View style={styles.options}>
          {urgencyLevels.map((level) => (
            <Pressable
              key={level}
              onPress={() => setUrgency(level)}
              style={[
                styles.option,
                urgency === level && styles.selectedOption,
                level === 'Critical' && urgency === level && styles.criticalOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  urgency === level && styles.selectedOptionText,
                ]}
              >
                {level}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.notice}>
          If the animal is in immediate danger, contact a local veterinarian
          or animal rescue service directly. This demo does not send live alerts.
        </Text>

        <Pressable style={styles.submitButton} onPress={submitReport}>
          <Text style={styles.submitText}>Prepare Rescue Report</Text>
        </Pressable>

        <Text style={styles.footer}>Every life matters. 💙</Text>
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
    padding: 22,
    paddingBottom: 36,
  },
  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#142B5F',
    marginBottom: 22,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#142B5F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#667085',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#172033',
    marginTop: 16,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  option: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D7E0EF',
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    backgroundColor: '#142B5F',
    borderColor: '#142B5F',
  },
  criticalOption: {
    backgroundColor: '#E53935',
    borderColor: '#E53935',
  },
  optionText: {
    color: '#344054',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E0EF',
    borderRadius: 13,
    padding: 15,
    fontSize: 15,
    color: '#172033',
  },
  multiline: {
    minHeight: 110,
  },
  notice: {
    marginTop: 22,
    marginBottom: 18,
    color: '#667085',
    fontSize: 13,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#142B5F',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#667085',
    marginTop: 20,
  },
  photoButton: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#2F5DAB',
  borderStyle: 'dashed',
  borderRadius: 13,
  padding: 18,
  alignItems: 'center',
},

photoButtonText: {
  color: '#2F5DAB',
  fontSize: 15,
  fontWeight: 'bold',
},

photoPreviewContainer: {
  marginTop: 12,
  alignItems: 'flex-start',
},

photoPreview: {
  width: '100%',
  height: 220,
  borderRadius: 13,
  backgroundColor: '#D7E0EF',
},

removePhotoButton: {
  marginTop: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: '#FDECEC',
  borderRadius: 8,
},

removePhotoText: {
  color: '#C62828',
  fontWeight: '600',
},
});