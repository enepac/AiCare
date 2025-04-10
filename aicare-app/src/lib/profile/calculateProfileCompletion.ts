import type { UserProfile } from "@/types/UserProfile";

export function calculateProfileCompletion(profile: UserProfile): number {
  const fieldsToCheck = [
    profile.name,
    profile.age,
    profile.gender,
    profile.height,
    profile.weight,
    profile.bmi,
    profile.bloodType,
    profile.allergies,
    profile.medications,
    profile.activityLevel
  ];

  const totalFields = fieldsToCheck.length;
  const completedFields = fieldsToCheck.filter((field) => field && field !== "").length;

  return Math.round((completedFields / totalFields) * 100);
}
