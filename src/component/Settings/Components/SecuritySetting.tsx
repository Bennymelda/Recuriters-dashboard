import { useState } from "react";
//import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
 import { useNotificationStore } from "../../../store/notificationStore";
import PasswordField from "./PasswordField";
import { Requirement } from "./RequiremwntProps";
import { useToastStore } from "../../toast/toastStore";
const SecuritySettings = () => {
 const [currentPassword, setCurrentPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 const [showCurrent, setShowCurrent] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [showConfirm, setShowConfirm] = useState(false);
const showToast = useToastStore((state) => state.showToast);
const updatePassword = useAuthStore(
 (state) => state.updatePassword
);
const addNotification = useNotificationStore(
 (state) => state.addNotification
);


const handleSave = () => {
 const result = updatePassword(
 currentPassword,
 newPassword,
 confirmPassword
 );

 if (result.success) {
 addNotification({
 title: "Password Updated",
 message: "Your password was changed successfully.",
 type: "security",
 });

 setCurrentPassword("");
 setNewPassword("");
 setConfirmPassword("");
 }
 
 showToast({
 type: "success",
 title: "Password Update",
 message: 'password has been updated successfully.',
 });
};

const hasMinLength = newPassword.length >= 8;
const hasUppercase = /[A-Z]/.test(newPassword);
const hasLowercase = /[a-z]/.test(newPassword);
const hasNumber = /\d/.test(newPassword);
const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);


 return (
 <div>

 <div className="mb-8">
 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
 Security
 </h2>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Change your account password.
 </p>
 </div>

 <div className="space-y-6">

 <PasswordField
 label="Current Password"
 value={currentPassword}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
 setCurrentPassword(e.target.value)
 }
 show={showCurrent}
 toggle={() => setShowCurrent(!showCurrent)}
 />

 <PasswordField
 label="New Password"
 value={newPassword}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
 setNewPassword(e.target.value)
 }
 show={showNew}
 toggle={() => setShowNew(!showNew)}
 />

 <PasswordField
 label="Confirm Password"
 value={confirmPassword}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
 setConfirmPassword(e.target.value)
 }
 show={showConfirm}
 toggle={() => setShowConfirm(!showConfirm)}
 />

 </div>

 <div className="mt-8 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
 <p className="text-sm text-zinc-600 dark:text-zinc-400">
 Password should contain at least:
 </p>

 <ul className="mt-4 space-y-3">

 <Requirement
 met={hasMinLength}
 text="8 or more characters"
 />

 <Requirement
 met={hasUppercase}
 text="One uppercase letter"
 />

 <Requirement
 met={hasLowercase}
 text="One lowercase letter"
 />

 <Requirement
 met={hasNumber}
 text="One number"
 />

 <Requirement
 met={hasSpecialCharacter}
 text="One special character"
 />

</ul>
 </div>

 <div className="mt-10 flex justify-end">
 <button
 onClick={handleSave}
 className="
 rounded-2xl
 bg-[#285A48]
 dark:[#BOE4CC]
 px-7
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#2f6d58]
 "
 >
 Update Password
 </button>
 </div>

 </div>
 );
};

export default SecuritySettings;