"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCheckPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If no session, redirect to homepage
    if (!session || !session.user) {
      router.replace("/");
      return;
    }

    // Now TypeScript knows session.user is defined
    if (session.user.isProfileComplete) {
      router.replace("/dashboard");
    } else {
      router.replace("/profile");
    }
  }, [session, status, router]);

  return <p>Loading...</p>;
}
