import React from "react";

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="text-sm text-gray-600 space-y-1 mt-2">
      <p className={password.length >= 8 ? "text-green-500" : "text-red-500"}>
        {password.length >= 8 ? "✅" : "❌"} At least 8 characters
      </p>
      <p className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[A-Z]/.test(password) ? "✅" : "❌"} At least one uppercase letter
      </p>
      <p className={/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[a-z]/.test(password) ? "✅" : "❌"} At least one lowercase letter
      </p>
      <p className={/[0-9]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[0-9]/.test(password) ? "✅" : "❌"} At least one number
      </p>
      <p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✅" : "❌"} At least one special character
      </p>
    </div>
  );
}
