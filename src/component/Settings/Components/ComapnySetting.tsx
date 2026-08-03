import { useEffect, useState } from "react";
import { useCompanyStore } from "../../../store/companyStore";
import { useNotificationStore } from "../../../store/notificationStore";
import {  MdCameraAlt} from "react-icons/md";
import { useRef } from "react";
const CompanySettings = () => {
 const company = useCompanyStore((state) => state.company);
 const updateCompany = useCompanyStore(
 (state) => state.updateCompany
 );
const addNotification = useNotificationStore(
 (state) => state.addNotification
);
 const [formData, setFormData] = useState(company);

 useEffect(() => {
 setFormData(company);
 }, [company]);

 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement>
 ) => {
 const { name, value } = e.target;

 setFormData((prev) => ({
 ...prev,
 [name]: value,
 }));
 };
const handleLogoUpload = (
 e: React.ChangeEvent<HTMLInputElement>
) => {
 const file = e.target.files?.[0];

 if (!file) return;

 const reader = new FileReader();

 reader.onload = () => {
 setFormData((prev) => ({
 ...prev,
 logo: reader.result as string,
 }));
 };

 reader.readAsDataURL(file);
};

const [hasChanges, setHasChanges] = useState(false);

useEffect(() => {
 setHasChanges(
 JSON.stringify(formData) !== JSON.stringify(company)
 );
}, [formData, company]);



 const handleSave = () => {
 updateCompany(formData);

 addNotification({
 title: "Company Settings Updated",
 message: "Your company information was updated successfully.",
 type: "system",
 });
  setHasChanges(false);
};
const fileInputRef = useRef<HTMLInputElement>(null);

 return (
 <div className="space-y-4 md:space-y-8 min-h-screen">


 {/* Header */}


<div className="rounded-[32px] border border-zinc-100 bg-white p-4 md:p-8  dark:border-zinc-800 dark:bg-zinc-900">

 <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:items-center lg:justify-between">

 {/* Left */}
 <div className="flex items-center gap-4">

 <input
 ref={fileInputRef}
 hidden
 type="file"
 accept="image/*"
 onChange={handleLogoUpload}
 />

 {/* Clickable Logo */}
 <div
 onClick={() => fileInputRef.current?.click()}
 className="group relative cursor-pointer"
 >
 <img
 src={
 formData.logo ||
 "https://ui-avatars.com/api/?name=Company&background=408A71&color=fff"
 }
 alt="Company Logo"
 className="
  h-24 w-25
 md:h-28
 md:w-28
 rounded-3xl
 border
 border-zinc-200
 object-cover

 transition
 duration-300
 group-hover:brightness-75

 dark:border-zinc-800
 "
 />

 {/* Edit Badge */}
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

 rounded-3xl

 bg-black/40

 opacity-0

 transition
 duration-300

 group-hover:opacity-100
 "
 >
 <span className="text-sm font-medium text-white">
 Change Logo
 </span>
 </div>
 </div>

 {/* Company Info */}
 <div>

 <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {formData.companyName || "Your Company"}
 </h1>

 

 <p className="max-w-sm md:max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Manage your organization's branding, contact information and
 workspace identity. Changes made here are reflected throughout
 your recruiter dashboard.
 </p>

 <span className="mt-3 rounded-full bg-[#EEF8F3] px-3 py-1 text-xs font-semibold text-[#285A48] dark:bg-[#285A48]/10 dark:text-[#B0E4CC]">
 Industry: {formData.industry || "Industry"}
 </span>

 </div>

 </div>

 </div>

</div>
 
 {/* Card */}

 <div
 className="
 rounded-3xl
 border
 border-zinc-100
 bg-white
 p-4
 md:p-8

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >

 <div className="grid gap-6 md:grid-cols-2">

 <Input
 label="Company Name"
 name="companyName"
 value={formData.companyName}
 onChange={handleChange}
 />

 <Input
 label="Industry"
 name="industry"
 value={formData.industry}
 onChange={handleChange}
 />

 <Input
 label="Company Size"
 name="companySize"
 value={formData.companySize}
 onChange={handleChange}
 />

 <Input
 label="Website"
 name="website"
 value={formData.website}
 onChange={handleChange}
 />

 <Input
 label="Company Email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 />

 <Input
 label="Phone Number"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 />

 </div>

 <div className="mt-6">

 <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Company Address
 </label>

 <input
 name="address"
 value={formData.address}
 onChange={handleChange}
 placeholder="Enter company address"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 transition

 focus:border-[#285A48]

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-white
 dark:focus:border-[#B0E4CC]
 "
 />

 </div>

 <div className="mt-8 flex justify-end">

<button
 onClick={handleSave}
 disabled={!hasChanges}
 className={`
 rounded-2xl
 px-6
 py-3
 font-semibold
 transition

 ${
 hasChanges
 ? "bg-[#285A48] text-white hover:bg-[#2f6d58]"
 : "bg-[#EEF8F3] text-[#285A48] cursor-default dark:bg-[#B0E4CC] dark:text-zinc-800"
 }
 `}
>
 {hasChanges ? "Save Changes" : " Changes Saved"}
</button>

 </div>

 </div>

 </div>
 );
};

export default CompanySettings;

interface InputProps {
 label: string;
 name: string;
 value: string;
 onChange: (
 e: React.ChangeEvent<HTMLInputElement>
 ) => void;
}

const Input = ({
 label,
 name,
 value,
 onChange,
}: InputProps) => {
 return (
 <div>

 <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 {label}
 </label>

 <input
 name={name}
 value={value}
 onChange={onChange}
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 outline-none
 transition

 focus:border-[#285A48]

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-white
 dark:focus:border-[#B0E4CC]
 "
 />

 </div>
 );
};