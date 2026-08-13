export const getPasswordChecks = (password: string) => {
 return {
 minLength: password.length >= 12,
 uppercase: /[A-Z]/.test(password),
 lowercase: /[a-z]/.test(password),
 number: /\d/.test(password),
 special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
 };
};

export const isPasswordStrong = (password: string) => {
 const checks = getPasswordChecks(password);

 return Object.values(checks).every(Boolean);
}