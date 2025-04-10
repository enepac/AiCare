"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleAssessmentClick = () => {
    router.push("/dashboard?section=chatbot");
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AiCare</h1>

        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>

          <button onClick={handleProfileClick} className="hover:text-gray-300">
            Profile
          </button>

          <button onClick={handleAssessmentClick} className="hover:text-gray-300">
            Smart Assessment
          </button>

          {session && session.user && (
            <div className="flex items-center space-x-3">
              <Image
                src={session.user.image || "/assets/avatar.png"}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full border border-gray-500"
              />
              <span className="text-sm">{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
