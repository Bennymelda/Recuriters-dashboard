import { MdCheckCircle } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

import {
 getPasswordChecks,
 isPasswordStrong,
} from "../../utils/passwordStrength";

type Props = {
 password: string;
};

const PasswordStrength = ({ password }: Props) => {
 const checks = getPasswordChecks(password);

 if (!password) return null;

 if (isPasswordStrong(password)) return null;

 const requirements = [
 {
 label: "At least 12 characters",
 passed: checks.minLength,
 },
 {
 label: "One uppercase letter",
 passed: checks.uppercase,
 },
 {
 label: "One lowercase letter",
 passed: checks.lowercase,
 },
 {
 label: "One number",
 passed: checks.number,
 },
 {
 label: "One special character",
 passed: checks.special,
 },
 ];

 return (
 <div
 className="
 mt-3
 rounded-2xl
 border
 border-zinc-200

 p-4

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
 Password must contain:
 </p>

 <div className="space-y-2">
 {requirements.map((item) => (
 <div
 key={item.label}
 className="flex items-center gap-2"
 >
 {item.passed ? (
 <MdCheckCircle className="text-green-500" />
 ) : (
 <GoDotFill className="text-zinc-400" />
 )}

 <span
 className={`text-sm ${
 item.passed
 ? "text-green-700 dark:text-green-600"
 : "text-zinc-500 dark:text-zinc-400"
 }`}
 >
 {item.label}
 </span>
 </div>
 ))}
 </div>
 </div>
 );
};

export default PasswordStrength;