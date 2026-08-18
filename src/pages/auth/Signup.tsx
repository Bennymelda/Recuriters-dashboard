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
import PasswordStrength from "./PasswordStrength";
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
  <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8 dark:bg-zinc-950">
    <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
     <section
 className="
 relative
 hidden
 flex-col
 items-center
 justify-between
 overflow-hidden
 py-10
 px-5
 lg:flex
 lg:w-1/2
 bg-[#285A48]
 dark:bg-[#102B24]
 "
>
 {/* Decorative waves */}
 <div
 className="
 pointer-events-none
 absolute
 inset-0
 z-0
 select-none
 "
 >
 <svg
 className="h-full w-full"
 viewBox="0 0 800 400"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 preserveAspectRatio="xMidYMid slice"
 >
 <defs>
 <linearGradient
 id="soft-wave"
 x1="0%"
 y1="0%"
 x2="100%"
 y2="0%"
 >
 <stop
 offset="0%"
 stopColor="#B0E4CC"
 stopOpacity="0.18"
 />

 <stop
 offset="50%"
 stopColor="#89D9B4"
 stopOpacity="0.12"
 />

 <stop
 offset="100%"
 stopColor="#B0E4CC"
 stopOpacity="0"
 />
 </linearGradient>

 <filter id="blur">
 <feGaussianBlur stdDeviation="2" />
 </filter>
 </defs>

 <path
 d="M0 250 C150 150, 350 350, 500 250 C650 150, 750 300, 900 200"
 stroke="url(#soft-wave)"
 strokeWidth="1.5"
 fill="none"
 filter="url(#blur)"
 />

 <path
 d="M-50 300 C200 200, 300 400, 600 280 C750 220, 850 260, 950 180"
 stroke="url(#soft-wave)"
 strokeWidth="1"
 fill="none"
 opacity="0.7"
 />

 <path
 d="M-100 100 C200 50, 400 200, 800 80"
 stroke="url(#soft-wave)"
 strokeWidth="1.5"
 fill="none"
 opacity="0.5"
 />
 </svg>
 </div>

 {/* Soft background glow */}
 <div
 className="
 pointer-events-none
 absolute
 inset-0
 z-0
 bg-gradient-to-br
 from-[#285A48]
 via-[#285A48]
 to-[#16423C]

 dark:from-[#102B24]
 dark:via-[#12382E]
 dark:to-[#0B211C]
 "
 />

 {/* Content */}
 <div
 className="
 relative
 z-10
 flex
 h-full
 w-full
 max-w-2xl
 flex-col
 justify-between
 px-2
 py-4
 "
 >
 {/* Brand */}
 <div>
 <div
 className="
 mb-6
 inline-flex
 items-center
 rounded-full
 border
 border-white/15
 bg-white/10
 px-4
 py-1.5
 text-sm
 font-semibold
 text-white
 backdrop-blur-sm

 dark:border-[#B0E4CC]/15
 dark:bg-[#B0E4CC]/10
 dark:text-[#D8F5E7]
 "
 >
 <span className="material-symbols-outlined mr-1.5 text-sm">
 workspace
 </span>

 Built for better hiring
 </div>

 <h1
 className="
 text-4xl
 font-bold
 tracking-tight
 text-white

 dark:text-[#E8F7F0]
 "
 >


 RecruiterPro
 </h1>
 </div>

 {/* Main message */}
 <div className="max-w-xl pb-6">
 <h2
 className="
 mb-5
 text-[42px]
 font-bold
 leading-[1.08]
 tracking-[-0.025em]
 text-white

 xl:text-[48px]

 dark:text-[#E8F7F0]
 "
 >
 Make hiring simpler.
 <br />
 Build your best team.
 </h2>

 <p
 className="
 max-w-lg
 text-[17px]
 font-normal
 leading-[1.7]
 text-white/75

 dark:text-[#C5E4D5]/80
 "
 >
 Manage candidates, organize interviews, track your
 hiring pipeline, and build a better recruitment
 workflow all in one place.
 </p>

 <p
 className="
 mt-6
 text-sm
 font-semibold
 tracking-wide
 text-[#E2FB6C]

 dark:text-[#B0E4CC]
 "
 >
 Hire with confidence.
 </p>
 </div>
 </div>
</section>
        





 <section className="w-full lg:w-1/2  bg-white dark:bg-zinc-900 flex flex-col justify-center items-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-[440px] md:max-w-[600px]">
         
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 lg:hidden h-10 bg-[#285A48] dark:bg-[#89D9B4]/90 rounded-xl flex items-center justify-center text-white">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                ></span>
              </div>
              <span className="text-[24px] lg:hidden  leading-[1.3] font-bold text-[#285A48] dark:text-[#89D9B4]/90 tracking-tight">
                RecuriterPro
              </span>{" "}
            </div>

            
            
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

 <p className="mt-2 text-sm text-zinc-500 dark:text-gray-300">
 Start managing your hiring team.
 </p>

 </div>
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
dark:placeholder-white/70
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-900
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
dark:placeholder-white/70
 dark:border-zinc-700
 dark:bg-zinc-900
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
dark:placeholder-white/70
 dark:border-zinc-700
 dark:bg-zinc-900
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
 dark:placeholder-white/70
 px-4
 py-3
 pr-12
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-900
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
 cursor-pointer
 -translate-y-1/2
 text-[#285A48]
 dark:text-[#B0E4CC]
 hover:text-zinc-600
 dark:hover:text-zinc-200
 "
 aria-label={showPassword ? "Hide password" : "Show password"}
 >
 {showPassword ? (
 <MdVisibility size={21} />
 ) : (
 <MdVisibilityOff size={21} />
 )}
 </button>
 </div>
 <PasswordStrength
 password={formData.password}
/>


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
 dark:bg-zinc-900
 dark:text-white
 dark:placeholder-white/70
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
  text-[#285A48]
  cursor-pointer
 dark:text-[#B0E4CC]
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
 <MdVisibility size={21} />
 ) : (
 <MdVisibilityOff size={21} />
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
 bg-[#285A48]
 dark:bg-[#89D9B4]/90
 py-3
 font-semibold
 text-white
 dark:text-black
 transition
 hover:bg-[#285A48]
 "
 >
 Create Account
 </button>


 </form>
          
           <div className=" flex items-center text-sm gap-2 justify-center mt-5">
    <p className="text-sm dark:text-white">Already have an account? </p> <Link to="/login" className="font-bold  text-[#285A48]
 dark:text-[#B0E4CC]">sign in</Link>
</div>
          </div>
        </section>



 </div>
</div>
);




};


export default Signup;

