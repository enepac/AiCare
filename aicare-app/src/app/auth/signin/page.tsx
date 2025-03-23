"use client";

import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
