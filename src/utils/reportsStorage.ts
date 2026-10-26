import AsyncStorage from '@react-native-async-storage/async-storage';

const REPORTS_KEY = '@jeevsetu/animal_reports';

export type AnimalReport = {
  caseId: string;
  animal: string;
  description: string;
  location: string;
  contact: string;
  urgency: string;
  photoUri?: string | null;
};

export async function saveReport(report: AnimalReport): Promise<void> {
  try {
    const existingReports = await getReports();
    const updatedReports = [report, ...existingReports];

    await AsyncStorage.setItem(
      REPORTS_KEY,
      JSON.stringify(updatedReports)
    );
  } catch (error) {
    console.error('Error saving animal report:', error);
    throw error;
  }
}

export async function getReports(): Promise<AnimalReport[]> {
  try {
    const storedReports = await AsyncStorage.getItem(REPORTS_KEY);

    if (storedReports === null) {
      return [];
    }

    return JSON.parse(storedReports) as AnimalReport[];
  } catch (error) {
    console.error('Error loading animal reports:', error);
    throw error;
  }
}
