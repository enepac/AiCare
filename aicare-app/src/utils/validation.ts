export function validatePassword(password: string, returnArray = false): string | string[] | null {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must include at least one special character");
  }

  if (returnArray) return errors;
  return errors.length > 0 ? errors[0] : null; // Return first error or null if valid
}
