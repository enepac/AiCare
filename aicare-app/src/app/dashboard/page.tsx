"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DashboardHeader from "@/components/DashboardHeader";
import PatientProfile from "@/components/PatientProfile";
import Sidebar from "@/components/Sidebar";
// import AppointmentList from "@/components/AppointmentList";
// import MedicationReminders from "@/components/MedicationReminders";
// import DataVisualization from "@/components/DataVisualization";
import PatientData from "@/components/PatientData";
import MedicalRecords from "@/components/MedicalRecords";
import ProfileProgressBar from "@/components/ProfileProgressBar";
import ChatbotWidget from "@/components/ChatbotWidget";

import type { UserProfile } from "@/types/UserProfile";
import type { ChatThread } from "@/types/chatbot";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFeature, setActiveFeature] = useState<string>("dashboard");
  const [initialized, setInitialized] = useState(false);

  const [threads, setThreads] = useState<ChatThread[]>([]);

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);

  const chatbotRef = useRef<HTMLDivElement>(null);
  const dashboardScrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfDashboard = () => {
    dashboardScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    const section = searchParams?.get("section");
    if (section && !initialized) {
      setActiveFeature(section);
      setInitialized(true);
    }
  }, [searchParams, initialized]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data: UserProfile = await res.json();
        setProfileData(data);

        const fieldsToCheck = [
          data.name,
          data.age,
          data.gender,
          data.height,
          data.weight,
          data.bmi,
          data.bloodType,
          data.allergies,
          data.medications,
          data.activityLevel
        ];

        const totalFields = fieldsToCheck.length;
        const completedFields = fieldsToCheck.filter((field) => field && field !== "").length;
        const percentage = Math.round((completedFields / totalFields) * 100);

        setProfileCompletion(percentage);
      } else {
        console.error("❌ Failed to fetch user profile");
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadThreads = async () => {
    try {
      const res = await fetch("/api/chatbot/threads", {
        credentials: "include"
      });
      const data = await res.json();

      if (!data.threads || data.threads.length === 0) {
        const newRes = await fetch("/api/chatbot/new-thread", {
          method: "POST",
          credentials: "include"
        });
        const newData = await newRes.json();
        setThreads([newData.thread]);
        setActiveThread(newData.thread);
      } else {
        const sorted = data.threads.sort(
          (a: ChatThread, b: ChatThread) =>
            new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime()
        );
        setThreads(sorted);
        setActiveThread(sorted[0]);
      }
    } catch (error) {
      console.error("❌ Error loading threads:", error);
    }
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    fetchProfile();
    loadThreads();
  }, [session, status, router]);

  useEffect(() => {
    if (activeFeature === "chatbot" && chatbotRef.current) {
      chatbotRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeFeature]);

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => prev && { ...prev, [name]: value });
  };

  const handlePregnantChange = (value: boolean) => {
    setProfileData((prev) => prev && { ...prev, isPregnant: value });
  };

  const saveProfile = async () => {
    if (!profileData) return;
    setSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });

      if (!res.ok) throw new Error("Save failed");

      setSaveMessage("Profile successfully saved!");
      await fetchProfile();
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      setSaveMessage("Error saving profile.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loadingProfile) {
    return <p>Loading your dashboard...</p>;
  }

  if (!profileData) {
    return <p>Couldn’t load your profile. Please try again later.</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />

        <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
          <DashboardHeader />

          {activeFeature === "dashboard" && (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Profile Completion: {profileCompletion}%
                </h2>
                <ProfileProgressBar completionPercentage={profileCompletion} />
                {profileCompletion < 100 && (
                  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md">
                    ⚠️ <strong>Complete your profile</strong> to ensure the AI can provide the most
                    accurate and personalized responses.
                    <button
                      className="ml-2 underline text-yellow-700 hover:text-yellow-900"
                      onClick={() => router.push("/profile")}
                    >
                      Complete Now
                    </button>
                  </div>
                )}
              </div>

              <PatientProfile
                {...profileData}
                isPregnant={profileData.isPregnant}
                handleChange={handleProfileChange}
                handlePregnantChange={handlePregnantChange}
                editable={true}
              />

              <button
                onClick={saveProfile}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

              {saveMessage && <p className="text-sm mt-2 text-green-600">{saveMessage}</p>}
            </>
          )}

          {activeFeature === "chatbot" && (
            <div ref={chatbotRef} className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
              <ChatbotWidget
                threads={threads}
                activeThread={activeThread}
                setActiveThread={setActiveThread}
                refreshThreads={loadThreads}
                onNewMessageScroll={scrollToBottomOfDashboard}
              />
              <div ref={dashboardScrollRef} />
            </div>
          )}

          {activeFeature === "patientData" && (
            <section className="flex-1 bg-white rounded-lg shadow-md overflow-y-auto p-6">
              <PatientData />
            </section>
          )}

          {/* {activeFeature === "appointments" && <AppointmentList />}
          {activeFeature === "medications" && <MedicationReminders />}
          {activeFeature === "visualization" && <DataVisualization />} */}

          {activeFeature === "medicalRecords" && (
            <section className="flex-1 bg-white rounded-lg shadow-md overflow-y-auto p-6">
              <MedicalRecords />
            </section>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
