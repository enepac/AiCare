"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCheckPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function verifyProfile() {
      if (status === "loading") return;

      if (!session || !session.user) {
        router.replace("/");
        return;
      }

      // Explicit API call to check profile completion status
      const res = await fetch("/api/profile/progress");
      if (res.ok) {
        const { completionPercentage } = await res.json();
        const isProfileComplete = completionPercentage === 100;

        // Update session immediately if discrepancy found
        if (session.user.isProfileComplete !== isProfileComplete) {
          await update({ isProfileComplete });
        }

        if (isProfileComplete) {
          router.replace("/dashboard");
        } else {
          router.replace("/profile");
        }
      } else {
        console.error("Failed to verify profile completion from API.");
        router.replace("/profile");
      }
    }

    verifyProfile();
  }, [session, status, router, update]);

  return <p>Loading...</p>;
}
