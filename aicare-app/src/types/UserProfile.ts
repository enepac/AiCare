export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  isPregnant: boolean;
  isProfileComplete: boolean; // ✅ explicitly add this line
}
