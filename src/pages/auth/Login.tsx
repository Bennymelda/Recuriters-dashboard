import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


const Login = () => {

 const navigate = useNavigate();

 const login = useAuthStore(
 (state) => state.login
 );
const [error, setError] = useState("");



 const [formData, setFormData] = useState({
 email: "",
 password: "",
 });



 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement>
 ) => {

 setFormData({
 ...formData,
 [e.target.name]: e.target.value,
 });

 };
const user = useAuthStore((state) => state.user);


 const handleSubmit = (
 e: React.FormEvent
 ) => {

 e.preventDefault();

const result = login(formData);


if (!result.success) {
 setError(result.message);
 return;
}


navigate("/dashboard");

 };

const hour = new Date().getHours();

const greeting =
 hour < 12
 ? "Good morning"
 : hour < 18
 ? "Good afternoon"
 : "Good evening"


  return (
   <div className="min-h-screen   ">
      <main className="flex shadow   dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 ">

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
        
        <section className="w-full lg:w-1/2  bg-white dark:bg-zinc-900 flex flex-col justify-center items-center px-6 py-12 lg:px-16">
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
              <h2 className="text-3xl whitespace-nowrap md:text-4xl leading-[1.25] font-semibold text-[#1d1a24] dark:text-gray-200 mb-1">
                Create your account
              </h2>

              <p className="text-[16px] dark:text-gray-300 leading-[1.5] text-[#4a4455]">
                Start learning from industry experts today.
              </p>
            </div>
            <form
 onSubmit={handleSubmit}
 className="space-y-5"
 >

 <input
 name="email"
 type="email"
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



 <input
 name="password"
 type="password"
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
 outline-none
 focus:border-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

{error && (
 <p className="text-sm text-red-500">
 {error}
 </p>
)}



 <button
 type="submit"
 className="
 w-full
 rounded-2xl
 bg-[#408A71]
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#285A48]
 "
 >
 Login
 </button>


 </form>

          
            <p className="mt-12 text-center text-sm font-semibold dark:text-gray-300 leading-[1.5] text-[#4a4455]">
              Already have an account?{" "}
              <Link
                className="text-[#285A48] dark:text-[#B0E4CC] font-bold hover:underline"
                to="/signup"
              >
                signUp
              </Link>
            </p>
          </div>


          <Link
 to="/forgot-password"
 className="
 text-sm
 font-medium
 text-[#408A71]
 hover:underline
 "
>
 Forgot Password?
</Link>
        </section>
      </main>
    </div>
  );
  
  /*

 return (
 <div
 className="
 flex
 min-h-screen
 items-center
 justify-center
 bg-zinc-50
 px-4

 dark:bg-zinc-950
 "
 >

 <div
 className="
 w-full
 max-w-md
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-8
 shadow-xl

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
  {greeting}, {user?.fullName ?? "Recruiter"} 👋

 </h1>


 <p className="mt-2 text-sm text-zinc-500">
 Login to your RecruitFlow workspace.
 </p>

 </div>



 <form
 onSubmit={handleSubmit}
 className="space-y-5"
 >

 <input
 name="email"
 type="email"
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



 <input
 name="password"
 type="password"
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
 outline-none
 focus:border-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

{error && (
 <p className="text-sm text-red-500">
 {error}
 </p>
)}



 <button
 type="submit"
 className="
 w-full
 rounded-2xl
 bg-[#408A71]
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#285A48]
 "
 >
 Login
 </button>


 </form>

<Link
 to="/forgot-password"
 className="
 text-sm
 font-medium
 text-[#408A71]
 hover:underline
 "
>
 Forgot Password?
</Link>


 </div>


 </div>
 );
 */
};


export default Login;

