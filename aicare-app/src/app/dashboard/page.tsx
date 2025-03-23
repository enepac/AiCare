"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DashboardHeader from "@/components/DashboardHeader";
import PatientProfile from "@/components/PatientProfile";
import Sidebar from "@/components/Sidebar";
import HealthSummary from "@/components/HealthSummary";
import AppointmentList from "@/components/AppointmentList";
import MedicationReminders from "@/components/MedicationReminders";
import ChatbotWidget from "@/components/ChatbotWidget";
import DataVisualization from "@/components/DataVisualization";
import MedicalRecords from "@/components/MedicalRecords";

import type { UserProfile } from "@/types/UserProfile"; // <-- import your new interface

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1) Which feature/tab is active
  const [activeFeature, setActiveFeature] = useState<string>("dashboard");

  // 2) Store the user’s profile data in state
  //    Initialize to null, meaning “not yet loaded”
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // still checking session

    if (!session) {
      // No session: redirect to homepage
      router.push("/");
      return;
    }

    // Session is valid, fetch the user’s profile
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data: UserProfile = await res.json();
          setProfileData(data);
        } else {
          console.error("❌ Failed to fetch user profile");
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [session, status, router]);

  // If still loading session or fetching profile, show a spinner or message
  if (status === "loading" || loadingProfile) {
    return <p>Loading your dashboard...</p>;
  }

  // If we have no profile data after loading, show an error or fallback
  if (!profileData) {
    return <p>Couldn’t load your profile. Please try again later.</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar setActiveFeature={setActiveFeature} />

        <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
          <DashboardHeader />

          {activeFeature === "dashboard" && (
            <>
              {/* Pass the actual data from `profileData` to the PatientProfile */}
              <PatientProfile
                name={profileData.name}
                age={profileData.age}
                gender={profileData.gender}
                height={profileData.height}
                weight={profileData.weight}
                bmi={profileData.bmi}
                bloodType={profileData.bloodType}
                pregnant={profileData.isPregnant}
                allergies={profileData.allergies}
                medications={profileData.medications}
                familyHistory={profileData.familyHistory}
                activityLevel={profileData.activityLevel}
                diet={profileData.diet}
                handleChange={() => {}}
                handlePregnantChange={() => {}}
              />
              <HealthSummary />
              <AppointmentList />
              <MedicationReminders />
              <ChatbotWidget />
              <DataVisualization />
            </>
          )}

          {activeFeature === "medicalRecords" && <MedicalRecords />}
        </div>
      </div>
    </DndProvider>
  );
}
