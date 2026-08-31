import { useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useTeamStore } from "../../store/teamStore";

const CompleteProfile = () => {
 const navigate = useNavigate();

 const user = useAuthStore((state) => state.user);
 const updateProfile = useAuthStore(
 (state) => state.updateProfile
 );
 
 const updateTeamMemberPhone = useTeamStore(
 (state) => state.updateTeamMemberPhone
 );

 const fileInputRef = useRef<HTMLInputElement>(null);

 const [fullName, setFullName] = useState(
 user?.fullName ?? ""
 );

 const [phoneNumber, setPhoneNumber] = useState(
 user?.phoneNumber ?? ""
 );

 const [jobTitle, setJobTitle] = useState(
 user?.jobTitle ?? ""
 );

 const [department, setDepartment] = useState(
 user?.department ?? ""
 );

 const [bio, setBio] = useState(
 user?.bio ?? ""
 );

 const [avatar, setAvatar] = useState(
 user?.avatar ?? ""
 );

 if (!user) {
 navigate("/login");
 return null;
 }

 const handleImageChange = (
 e: React.ChangeEvent<HTMLInputElement>
 ) => {
 const file = e.target.files?.[0];

 if (!file) return;

 const reader = new FileReader();

 reader.onloadend = () => {
 setAvatar(reader.result as string);
 };

 reader.readAsDataURL(file);
 };

 const handleComplete = async () => {
 updateProfile({
 fullName: fullName.trim() || user.fullName,
 companyName: user.companyName,
 phoneNumber: phoneNumber.trim(),
 jobTitle: jobTitle.trim(),
 department: department.trim(),
 bio: bio.trim(),
 location: user.location ?? "",
 timeZone: user.timeZone ?? "",
 avatar,
 });

 // Sync phone number to team member in Firestore
 try {
 await updateTeamMemberPhone(
 user.companyId,
 user.id,
 phoneNumber.trim()
 );
 } catch (error) {
 console.error("Failed to sync phone number to team member:", error);
 // Continue anyway - this is not critical
 }

 navigate("/dashboard");
 };

 const handleSkip = () => {
 navigate("/dashboard");
 };

 return (
 <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
 <div className="mx-auto w-full max-w-2xl">

 {/* Header */}
 <div className="mb-8 text-center">
 <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
 Complete your profile
 </h1>

 <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 Add a few details to personalize your profile.
 You can always update this later from Settings.
 </p>
 </div>

 {/* Card */}
 <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900">

 {/* Avatar */}
 <div className="mb-8 flex flex-col items-center">

 <input
 ref={fileInputRef}
 type="file"
 accept="image/*"
 hidden
 onChange={handleImageChange}
 />

 <button
 type="button"
 onClick={() =>
 fileInputRef.current?.click()
 }
 className="group relative cursor-pointer"
 >
 <img
 src={
 avatar ||
 `https://ui-avatars.com/api/?name=${encodeURIComponent(
 fullName || user.fullName
 )}&background=285A48&color=fff`
 }
 alt={fullName || user.fullName}
 className="
 h-28
 w-28
 rounded-full
 border-4
 border-white
 object-cover
 shadow-md
 ring-2
 ring-[hashtag#408A71]/20
 transition
 group-hover:brightness-75
 dark:border-zinc-900
 "
 />

 <span
 className="
 absolute
 bottom-1
 right-1
 flex
 h-9
 w-9
 items-center
 justify-center
 rounded-full
 border-2
 border-white
 bg-[hashtag#285A48]
 text-white
 dark:border-zinc-900
 dark:bg-[hashtag#B0E4CC]
 dark:text-zinc-900
 "
 >
 <MdCameraAlt size={18} />
 </span>
 </button>

 <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
 Profile photo is optional
 </p>
 </div>

 {/* Form */}
 <div className="grid gap-5 md:grid-cols-2">

 {/* Full Name */}
 <div>
 <label className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 Full Name
 </label>

 <input
 value={fullName}
 onChange={(e) =>
 setFullName(e.target.value)
 }
 placeholder="Your full name"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Phone */}
 <div>
 <label className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 Phone Number
 </label>

 <input
 value={phoneNumber}
 onChange={(e) =>
 setPhoneNumber(e.target.value)
 }
 placeholder="+234 801 234 5678"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Job Title */}
 <div>
 <label className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 Job Title
 </label>

 <input
 value={jobTitle}
 onChange={(e) =>
 setJobTitle(e.target.value)
 }
 placeholder="e.g. Senior Recruiter"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Department */}
 <div>
 <label className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 Department
 </label>

 <input
 value={department}
 onChange={(e) =>
 setDepartment(e.target.value)
 }
 placeholder="e.g. Human Resources"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Bio */}
 <div className="md:col-span-2">
 <label className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 About You
 </label>

 <textarea
 rows={4}
 value={bio}
 onChange={(e) =>
 setBio(e.target.value)
 }
 placeholder="Tell your team a little about yourself..."
 className="
 w-full
 resize-none
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>
 </div>

 {/* Actions */}
 <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

 <button
 type="button"
 onClick={handleSkip}
 className="
 rounded-2xl
 border
 border-zinc-200
 px-6
 py-3
 text-sm
 font-semibold
 text-zinc-600
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 "
 >
 Skip for now
 </button>

 <button
 type="button"
 onClick={handleComplete}
 className="
 rounded-2xl
 bg-[#285A48]
 px-6
 py-3
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-[hashtag#35745E]
 dark:bg-[hashtag#B0E4CC]
 dark:text-zinc-900
 dark:hover:bg-[hashtag#89D9B4]
 "
 >
 Complete Profile
 </button>

 </div>
 </div>

 <p className="mt-5 text-center text-xs text-zinc-400">
 You can update these details anytime from Settings.
 </p>
 </div>
 </div>
 );
};

export default CompleteProfile;