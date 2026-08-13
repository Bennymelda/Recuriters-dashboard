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


 /*
  return (
    <div className="min-h-screen px-5 md:px-10  mb-10 mt-10 ">
      <main className="flex shadow  rounded-2xl overflow-hidden border border-gray-100 ">
 

        <section className="hidden lg:flex relative py-10 lg:w-1/2  flex-col px-16 bg-[#16423C]">
          <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-40">
            <svg
              className="w-full h-full"
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
                  <stop offset="0%" stopColor="#E2FB6C" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#3ab3a2" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#16423C" stopOpacity="0" />
                </linearGradient>

               
                <filter id="blur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              <path
                d="M0 250 C 150 150, 350 350, 500 250 C 650 150, 750 300, 900 200"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#blur)"
              />

              <path
                d="M-50 300 C 200 200, 300 400, 600 280 C 750 220, 850 260, 950 180"
                stroke="url(#soft-wave)"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />

           
              <path
                d="M-100 100 C 200 50, 400 200, 800 80"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
      
          <div className="absolute inset-0 z-0 bg-[#16423C]/70"></div>

          <div className="relative z-10 flex flex-col gap-70  h-full">

            <div>
           
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
                <span className="material-symbols-outlined text-sm mr-1">
                  school
                </span>
                Academic Excellence System
              </div>
              <h1 className="text-4xl font-bold text-white">PerfectScore</h1>
            </div>

          
            <div className="max-w-xl">
              
              <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-4">
                Start Your Journey to{" "}
                <span className="text-[#ffd700]">Excellence</span>
              </h1>

              
              <p className="text-[18px] leading-[1.6] font-normal text-white/80 mb-10">
                Gain industry-recognized credentials and master the skills that
                define modern professions through our curated learning paths.
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full lg:w-1/2  bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-[440px] md:max-w-[600px]">
         
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 lg:hidden h-10 bg-[#16423C] rounded-xl flex items-center justify-center text-white">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                ></span>
              </div>
              <span className="text-[24px] lg:hidden  leading-[1.3] font-bold text-[#16423C] tracking-tight">
                PerfectScore
              </span>{" "}
            </div>

            
            <div className="mb-8 ">
              <h2 className="text-3xl whitespace-nowrap md:text-4xl leading-[1.25] font-semibold text-[#1d1a24] mb-1">
                Create your account
              </h2>

              <p className="text-[16px] leading-[1.5] text-[#4a4455]">
                Start learning from industry experts today.
              </p>
            </div>
            {errors.general && <p className="text-red-400">{errors.general}</p>}
         
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-400">{errors.name}</p>}
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && <p className="text-red-400">{errors.email}</p>}
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  showPasswordToggle
                  onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordStrength password={password} />
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  showPasswordToggle
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400">{errors.confirmPassword}</p>
                )}
                {errors.password && <p>{errors.password}</p>}
              </div>
             
              <div className="flex items-start  gap-2">
                <div className="flex items-center h-5 ">
                  <input
                    className="w-5 h-5 cursor-pointer accent-[#1d1a24] border-[#7b7486] rounded-md focus:ring-[#16423C]"
                    id="terms"
                    type="checkbox"
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                </div>

                <label
                  className="text-xs font-semibold text-[#4a4455]"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <span className="text-[#16423C] font-semibold ">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#16423C] font-semibold ">
                    Privacy Policy
                  </span>
                </label>
              </div>
              {errors.accepted && <p>{errors.accepted}</p>}
      

              <Button
                text="Create Account"
                loading={loading}
                loadingText="Creating account..."
                type="submit"
              />
            </form>

          
            <p className="mt-12 text-center text-[16px] leading-[1.5] text-[#4a4455]">
              Already have an account?{" "}
              <Link
                className="text-[#16423C] font-bold hover:underline"
                to="/login"
              >
                Log In
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );


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

  */




return (
<div className="min-h-screen   ">
      <div className="flex shadow   dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 ">
 <section className="hidden lg:flex  relative py-10 lg:w-1/2 items-center flex-col px-16 bg-[#285A48]  dark:bg-[#B0E4CC]">
          <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-40">
            <svg
              className="w-full h-full"
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
                  <stop offset="0%" stopColor="#E2FB6C" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#3ab3a2" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#16423C" stopOpacity="0" />
                </linearGradient>

               
                <filter id="blur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              <path
                d="M0 250 C 150 150, 350 350, 500 250 C 650 150, 750 300, 900 200"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#blur)"
              />

              <path
                d="M-50 300 C 200 200, 300 400, 600 280 C 750 220, 850 260, 950 180"
                stroke="url(#soft-wave)"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />

           
              <path
                d="M-100 100 C 200 50, 400 200, 800 80"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
      
          <div className="absolute inset-0 z-0 bg-[#285A48]  dark:bg-[#89D9B4]/90"></div>

          <div className="relative z-10 flex flex-col gap-70  h-full">

            <div>
           
              <div className="inline-flex items-center dark:text-black px-4 py-1 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
                <span className="material-symbols-outlined text-sm mr-1">
                  Workspace
                </span>
                Building Excellent System
              </div>
              <h1 className="text-4xl font-bold text-white dark:text-zinc-800">RecuriterPro</h1>
            </div>

          
            <div className="max-w-xl">
              
              <h1 className="text-[48px] dark:text-zinc-800 leading-[1.1] tracking-[-0.02em] font-bold text-white mb-4">
                 Make hiring simpler.
 <br />
 Build your best team.{" "}
                <span className="text-[#ffd700]">Excellence</span>
              </h1>

              
              <p className="text-[18px] dark:text-zinc-600 leading-[1.6] font-normal text-white/80 mb-10">
                Manage candidates, organize interviews, track your hiring
 pipeline, and build a better recruitment workflow all in
 one place.
              </p>
            </div>
          </div>
        </section>
        





 <section className="w-full lg:w-1/2  bg-white dark:bg-zinc-800 flex flex-col justify-center items-center px-6 py-12 lg:px-16">
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
dark:placeholder-white/70
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
dark:placeholder-white/70
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
 dark:placeholder-white/70
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
 text-[#285A48]
 dark:text-[#B0E4CC]
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
 dark:bg-zinc-800
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



 {/* 
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
*/}


 </div>
</div>
);




};


export default Signup;

