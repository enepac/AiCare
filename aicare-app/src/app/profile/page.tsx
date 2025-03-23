"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepProfile from "@/components/MultiStepProfile";

export default function ProfilePage() {
  const router = useRouter();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkProfileCompletion() {
      try {
        const res = await fetch("/api/profile/progress");
        if (res.ok) {
          const { completionPercentage } = await res.json();
          setIsProfileComplete(completionPercentage === 100);
        }
      } catch (error) {
        console.error("❌ Error checking profile:", error);
        setIsProfileComplete(false);
      }
    }

    checkProfileCompletion();
  }, []);

  useEffect(() => {
    if (isProfileComplete) {
      router.replace("/dashboard"); // Redirect to dashboard if profile is already complete
    }
  }, [isProfileComplete, router]);

  if (isProfileComplete === null) {
    return <p>Loading...</p>;
  }

  return <MultiStepProfile />;
}
