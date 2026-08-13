import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useCompanyStore } from "../../../store/companyStore";
import { useRef} from "react";
import { MdCameraAlt } from "react-icons/md";

const ProfileSettings = () => {
 const user = useAuthStore((state) => state.user);
const company = useCompanyStore((state) => state.company);

 const [fullName, setFullName] = useState(user?.fullName ?? "");
 const [email] = useState(user?.email ?? "");
 
const [companyName, setCompanyName] = useState(
 company.companyName
);
const [phoneNumber, setPhoneNumber] = useState(
 user?.phoneNumber ?? ""
);

const [jobTitle, setJobTitle] = useState(
 user?.jobTitle ?? "Recruiter"
);

const [department, setDepartment] = useState(
 user?.department ?? "Human Resources"
);

const [bio, setBio] = useState(
 user?.bio ?? ""
);

const [location, setLocation] = useState(
 user?.location ?? ""
);

const [timeZone, setTimeZone] = useState(
 user?.timeZone ?? ""
);

 const updateProfile = useAuthStore(
 (state) => state.updateProfile
);

const handleSave = () => {
 updateProfile({
 fullName,
 companyName,
 phoneNumber,
 jobTitle,
 department,
 bio,
 location,
 timeZone,
 avatar,
});
};


const [avatar, setAvatar] = useState(user?.avatar ?? "");

const fileInputRef = useRef<HTMLInputElement>(null);

const hasChanges =
 fullName !== (user?.fullName ?? "") ||
 companyName !== company.companyName ||
 phoneNumber !== (user?.phoneNumber ?? "") ||
 jobTitle !== (user?.jobTitle ?? "") ||
 department !== (user?.department ?? "") ||
 bio !== (user?.bio ?? "") ||
 location !== (user?.location ?? "") ||
 timeZone !== (user?.timeZone ?? "") ||
 avatar !== (user?.avatar ?? "");


 return (
 <div>


 {/* Avatar */}

 <div className="rounded-[32px] border border-zinc-100 bg-white p-4  md:p-8 dark:border-zinc-800 dark:bg-zinc-900">
 <div className="flex flex-col  gap-4 md:gap-8 lg:flex-row lg:items-center lg:justify-between">

 {/* Left */}
 <div className="flex items-center gap-5">

 <input
 ref={fileInputRef}
 hidden
 type="file"
 accept="image/*"
 onChange={(e) => {
 const file = e.target.files?.[0];

 if (!file) return;

 const reader = new FileReader();

 reader.onloadend = () => {
 setAvatar(reader.result as string);
 };

 reader.readAsDataURL(file);
 }}
 />

 {/* Clickable Avatar */}
 <div
 onClick={() => fileInputRef.current?.click()}
 className="group relative cursor-pointer"
 >
 <img
 src={
 avatar ||
 `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`
 }
 alt={fullName}
 className="
 h-24 w-25
 md:h-28
 md:w-28
 rounded-full
 border
 border-zinc-200
 object-cover
 transition
 duration-300
 group-hover:brightness-75
 dark:border-zinc-800
 "
 />

 {/* Camera Badge */}
 <div
 className="
 absolute
 bottom-0
 right-0
 flex
 h-8 w-8
 md:h-10
 md:w-10
 items-center
 justify-center
 rounded-full
 border-2
 border-white
 bg-[#285A48]
 text-white
 transition
 duration-300
 group-hover:scale-110
 dark:border-zinc-900
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 "
 >
 <MdCameraAlt size={18} />
 </div>

 {/* Hover Overlay */}
 <div
 className="
 absolute
 inset-0
 flex
 items-center
 justify-center
 rounded-full
 bg-black/40
 opacity-0
 transition
 duration-300
 group-hover:opacity-100
 "
 >
 <span className="text-sm font-medium text-white">
 Change Photo
 </span>
 </div>
 </div>

 {/* Profile Info */}
 <div>
 <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
 {fullName || "Your Name"}
 </h1>


 <p className="mt-1 max-w-sm md:max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Manage your personal information, profile photo, and professional details.
 This information is visible across your recruiter workspace.
 </p>

 <div className="mt-4 flex flex-wrap gap-2">

 <span className="rounded-full bg-[#EEF8F3] px-3 py-1 text-xs font-semibold text-[#285A48] dark:bg-[#285A48]/10 dark:text-[#B0E4CC]">
 {department || "Human Resources"}
 </span>

 <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
 {companyName || "Company"}
 </span>

 </div>

 </div>
 </div>

 </div>
</div>



 {/* Form */}

 <div className="grid gap-6 md:grid-cols-2">
 {/* Full Name */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Full Name
 </label>

 <input
 value={fullName}
 onChange={(e) => setFullName(e.target.value)}
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Email */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Email
 </label>

 <input
 value={email}
 readOnly
 className="
 w-full
 cursor-not-allowed
 rounded-2xl
 border
 border-zinc-300
 bg-zinc-100
 px-4
 py-3
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-400
 "
 />
 </div>

 {/* Phone Number */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Phone Number
 </label>

 <input
 value={phoneNumber}
 onChange={(e) => setPhoneNumber(e.target.value)}
 placeholder="+234 801 234 5678"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Job Title */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Job Title
 </label>

 <input
 value={jobTitle}
 onChange={(e) => setJobTitle(e.target.value)}
 placeholder="Senior Recruiter"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Department */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Department
 </label>

 <input
 value={department}
 onChange={(e) => setDepartment(e.target.value)}
 placeholder="Human Resources"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Company */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Company
 </label>

 <input
 value={companyName}
 onChange={(e) => setCompanyName(e.target.value)}
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Location */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Location
 </label>

 <input
 value={location}
 onChange={(e) => setLocation(e.target.value)}
 placeholder="Lagos, Nigeria"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Time Zone */}
 <div>
 <label className="mb-2 block text-sm font-semibold">
 Time Zone
 </label>

 <input
 value={timeZone}
 onChange={(e) => setTimeZone(e.target.value)}
 placeholder="Africa/Lagos"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>

 {/* Bio */}
 <div className="md:col-span-2">
 <label className="mb-2 block text-sm font-semibold">
 Bio / About Me
 </label>

 <textarea
 rows={5}
 value={bio}
 onChange={(e) => setBio(e.target.value)}
 placeholder="Tell candidates and your team a little about yourself..."
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 resize-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />
 </div>
</div>

 {/* Footer */}

 <div className="mt-10 flex justify-end">

 <button
 onClick={handleSave}
 disabled={!hasChanges}
 className={`
 rounded-2xl
 px-7
 py-3
 font-semibold
 transition-all
 duration-300
 ${
 hasChanges
 ? " bg-[#2f6d58] text-white dark:bg-[#B0E4CC] dark:text-black hover:bg-[#408A71]"
 : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
 }
 `}
>
 {hasChanges ? "Save Changes" : "No Changes"}
</button>
 </div>

 </div>
 );
};

export default ProfileSettings;