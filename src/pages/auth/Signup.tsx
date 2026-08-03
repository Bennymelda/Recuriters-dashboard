import { useState } from "react";
import {
    MdEmail,
    MdError,
 MdVisibility,
 MdVisibilityOff,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyStore";
import { useAuthStore } from "../../store/authStore";
type FormErrors = {
 fullName: string;
 companyName: string;
 email: string;
 password: string;
 confirmPassword:string;
};


const Signup = () => {

 const navigate = useNavigate();

 const signup = useAuthStore(
 (state) => state.signup
 );



const initializeCompany = useCompanyStore(
 (state) => state.initializeCompany
);

 const [formData, setFormData] = useState({
 fullName: "",
 email: "",
 password: "",
 companyName: "",
 confirmPassword:"",
 });


const [errors, setErrors] = useState<FormErrors>({
 fullName: "",
 companyName: "",
 email: "",
 password: "",
 confirmPassword:"",
});


const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);



 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement>
) => {
 const { name, value } = e.target;

 setFormData({
 ...formData,
 [name]: value,
 });

 setErrors({
 ...errors,
 [name]: "",
 });
};


const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();

 const newErrors = {
 fullName: "",
 companyName: "",
 email: "",
 password: "",
 confirmPassword:"",
 };

 if (!formData.fullName.trim()) {
 newErrors.fullName = "Full name is required";
 }

 if (!formData.companyName.trim()) {
 newErrors.companyName = "Company name is required";
 }

 if (!formData.email.trim()) {
 newErrors.email = "Work email is required";
 }

 if (!formData.password.trim()) {
 newErrors.password = "Password is required";
} else if (formData.password.length < 12) {
 newErrors.password = "Password must be at least 12 characters";
}

if (!formData.confirmPassword.trim()) {
 newErrors.confirmPassword = "Please confirm your password";
} else if (formData.password !== formData.confirmPassword) {
 newErrors.confirmPassword = "Passwords do not match";
}if (!formData.password.trim()) {
 newErrors.password = "Password is required";
 } else if (formData.password.length < 12) {
 newErrors.password = "Password must be at least 12 characters";
 }

 setErrors(newErrors);

 // Stop here if there is any error
 if (Object.values(newErrors).some((error) => error !== "")) {
 return;
 }

 signup(formData);

 initializeCompany({
 id: crypto.randomUUID(),
 companyName: formData.companyName,
 logo: "",
 industry: "",
 companySize: "",
 website: "",
 email: formData.email,
 phone: "",
 address: "",
 });

 navigate("/select-role");
};


return (
<div className="bg-gray-100 py-4 px-4">
 <div className="min-h-screen  md:bg-white dark:bg-zinc-950 lg:flex justify-between  items-center md:rounded-4xl">

 {/* LEFT — CAREERFLOW BRAND PANEL */}
 <div
 className="
 relative
 hidden
 rounded-l-4xl
 min-h-screen
 w-1/2
 overflow-hidden
 bg-[#285A48]
 dark:bg-[#B0E4CC]
 p-10
 lg:flex
 lg:flex-col
 lg:justify-between
 "
 >

 {/* Decorative background */}
 <div
 className="
 absolute
 -right-32
 top-1/4
 h-96
 w-96
 rounded-full
 bg-[#408A71]/40
 blur-3xl
 "
 />

 <div
 className="
 absolute
 -bottom-40
 -left-20
 h-96
 w-96
 rounded-full
 bg-[#B0E4CC]/10
 blur-3xl
 "
 />

 {/* BRAND */}
 <div className="relative z-10 flex items-center gap-3">

 <div
 className="
 flex
 h-10
 w-10
 items-center
 justify-center
 rounded-xl
 bg-[#B0E4CC]
 text-lg
 font-bold
 text-[#285A48]
 "
 >
 C
 </div>

 <span className="text-xl font-bold text-white">
 CareerFlow
 </span>

 </div>


 {/* MAIN CONTENT */}
 <div className="relative z-10 max-w-xl">



 <h1
 className="
 text-4xl
 font-semibold
 leading-tight
 tracking-tight
 text-white
 xl:text-6xl
 "
 >
 Make hiring simpler.
 <br />
 Build your best team.
 </h1>

 <p
 className="
 mt-6
 max-w-lg
 text-base
 leading-7
 text-white/70
 xl:text-lg
 xl:leading-8
 "
 >
 Manage candidates, organize interviews, track your hiring
 pipeline, and build a better recruitment workflow — all in
 one place.
 </p>




 </div>


 {/* BOTTOM */}
 <div className="relative z-10 flex items-center gap-3">

 <div className="flex -space-x-2">

 <div className="h-8 w-8 rounded-full border-2 border-[#285A48] bg-zinc-300" />

 <div className="h-8 w-8 rounded-full border-2 border-[#285A48] bg-zinc-400" />

 <div className="h-8 w-8 rounded-full border-2 border-[#285A48] bg-zinc-500" />

 </div>

 <p className="text-sm text-white/60">
 Built for modern recruiting teams
 </p>

 </div>

 </div>


 {/* RIGHT — YOUR EXISTING SIGNUP FORM */}
 <div
 className="
 flex
 min-h-screen
 w-full
 items-center
 justify-center
md:rounded-r-4xl
 lg:w-1/2
 "
 >

 {/* KEEP YOUR EXISTING FORM CARD HERE */}

 <div
 className="
 w-full
 max-w-lg
 md:rounded-0
rounded-3xl
md:border-0
 border
 md:shadow-none
 shadow-sm
 border-zinc-200
 bg-white
 p-8
 md:p-4

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >

 {/* Your existing signup content goes here */}

 <div className="mb-8 text-center">

 <h1
 className="
 text-3xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Create your workspace
 </h1>

 <p className="mt-2 text-sm text-zinc-500">
 Start managing your hiring team.
 </p>

 </div>


 {/* PUT YOUR EXISTING FORM HERE */}

<form
 onSubmit={handleSubmit}
 className="space-y-8"
 >

<div>
 <input
 name="fullName"
 value={formData.fullName}
 onChange={handleChange}
 placeholder="Full name"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 {errors.fullName && (
 <p className="mt-1.5 text-sm text-red-500">
 {errors.fullName}
 </p>
 )}
</div>


 <input
 name="companyName"
 value={formData.companyName}
 onChange={handleChange}
 placeholder="Company name"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 {errors.companyName && (
 <p className="mt-1.5 text-sm text-red-500">
 {errors.companyName}
 </p>
 )}

<div>
 <input
 name="email"

 value={formData.email}
 onChange={handleChange}
 placeholder="Work email"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

    
{errors.email && (
<div className="flex items-center gap-2 mt-1.5">

<MdEmail className="text-red-500"/>
 <p className=" text-sm text-red-500">
 {errors.email}
 </p>
</div>

 )}

 </div>


<div>
 <div className="relative">
 <input
 name="password"
 type={showPassword ? "text" : "password"}
 value={formData.password}
 onChange={handleChange}
 placeholder="Password"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 pr-12
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 <button
 type="button"
 onClick={() => setShowPassword((prev) => !prev)}
 className="
 absolute
 right-4
 top-1/2
 -translate-y-1/2
 text-zinc-400
 hover:text-zinc-600
 dark:hover:text-zinc-200
 "
 aria-label={showPassword ? "Hide password" : "Show password"}
 >
 {showPassword ? (
 <MdVisibilityOff size={21} />
 ) : (
 <MdVisibility size={21} />
 )}
 </button>
 </div>
<div className="flex items-center gap-2 mt-1.5">
   
{errors.password && (
    <div className="flex items-center gap-2 mt-1.5">

<MdError className="text-red-500"/>
 <p className=" text-sm text-red-500">
 {errors.password}
 </p>
 </div>
 )}
</div>
 
</div>


<div>
 <div className="relative">
 <input
 name="confirmPassword"
 type={showConfirmPassword ? "text" : "password"}
 value={formData.confirmPassword}
 onChange={handleChange}
 placeholder="Confirm password"
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 pr-12
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 <button
 type="button"
 onClick={() => setShowConfirmPassword((prev) => !prev)}
 className="
 absolute
 right-4
 top-1/2
 -translate-y-1/2
 text-zinc-400
 hover:text-zinc-600
 dark:hover:text-zinc-200
 "
 aria-label={
 showConfirmPassword
 ? "Hide confirm password"
 : "Show confirm password"
 }
 >
 {showConfirmPassword ? (
 <MdVisibilityOff size={21} />
 ) : (
 <MdVisibility size={21} />
 )}
 </button>
 </div>
<div className="flex items-center gap-2 mt-1.5">
    
 {errors.confirmPassword && (
     <div className="flex items-center gap-2 mt-1.5">

<MdError className="text-red-500"/>
 <p className=" text-sm text-red-500">
 {errors.confirmPassword}
 </p>
 </div>
 )}
 </div>
</div>

 <button
 type="submit"
 className="
 w-full
mt-4
 rounded-2xl
 bg-[#408A71]
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#285A48]
 "
 >
 Create Account
 </button>


 </form>
<div className=" flex items-center text-sm gap-2 justify-center mt-5">
    <p className="text-sm">Already have an account? </p> <Link to="/login" className="font-bold  text-[#285A48]
 dark:text-[#B0E4CC]">sign in</Link>
</div>

 </div>

 </div>

 </div>
</div>
);




};


export default Signup;

