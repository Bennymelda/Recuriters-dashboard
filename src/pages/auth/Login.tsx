import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


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

const [showPassword, setShowPassword] = useState(false);






    return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8 dark:bg-zinc-950">
    <main className="flex w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <section
 className="
 relative
 hidden
 min-h-screen
 flex-col
 overflow-hidden
 py-10
 px-5
 lg:flex
 lg:w-1/2
 bg-[#16423C]

 dark:bg-[#0D2923]
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
 id="perfectscore-wave"
 x1="0%"
 y1="0%"
 x2="100%"
 y2="0%"
 >
 <stop
 offset="0%"
 stopColor="#E2FB6C"
 stopOpacity="0.22"
 />

 <stop
 offset="50%"
 stopColor="#89D9B4"
 stopOpacity="0.14"
 />

 <stop
 offset="100%"
 stopColor="#16423C"
 stopOpacity="0"
 />
 </linearGradient>

 <filter id="perfectscore-blur">
 <feGaussianBlur stdDeviation="2" />
 </filter>
 </defs>

 <path
 d="M0 250 C150 150, 350 350, 500 250 C650 150, 750 300, 900 200"
 stroke="url(#RecrutierPro-wave)"
 strokeWidth="1.5"
 fill="none"
 filter="url(#RecrutierPro-blur)"
 />

 <path
 d="M-50 300 C200 200, 300 400, 600 280 C750 220, 850 260, 950 180"
 stroke="url(#RecrutierPro-wave)"
 strokeWidth="1"
 fill="none"
 opacity="0.7"
 />

 <path
 d="M-100 100 C200 50, 400 200, 800 80"
 stroke="url(#RecrutierPro-wave)"
 strokeWidth="1.5"
 fill="none"
 opacity="0.5"
 />
 </svg>
 </div>

 {/* Background overlay */}
 <div
 className="
 pointer-events-none
 absolute
 inset-0
 z-0
 bg-gradient-to-br
 from-[#16423C]/95
 via-[#16423C]/80
 to-[#285A48]/90

 dark:from-[#0D2923]/95
 dark:via-[#102F28]/90
 dark:to-[#16423C]/90
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
 school
 </span>

 Dashboard built for better hiring
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
 RecuriterPro
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
 Hire smarter.
 <br />
 Build a stronger team.
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
 Manage your candidates, streamline your hiring process,
 collaborate with your team, and make better hiring decisions
 from one powerful workspace.
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
 dark:bg-zinc-900
 dark:text-white
 "
 />



<div className="relative mb-2">
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

         

{error && (
 <p className="text-sm text-red-500">
 {error}
 </p>
)}


 <Link
 to="/forgot-password"
 className="
 text-sm

 font-medium
 text-[#285A48]
 dark:text-[#89D9B4]/90
 hover:underline
 "
>
 Forgot Password?
</Link>
 <button
 type="submit"
 className="
 w-full
 rounded-2xl
cursor-pointer
 
 mt-10
 font-semibold
 text-white
 transition

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
 Login
 </button>


 </form>

          
            <p className="mt-3 text-center text-sm font-semibold dark:text-gray-300 leading-[1.5] text-[#4a4455]">
              Already have an account?{" "}
              <Link
                className="text-[#285A48] dark:text-[#B0E4CC] font-bold hover:underline"
                to="/signup"
              >
                signUp
              </Link>
            </p>
          </div>



        </section>
      </main>
    </div>
  );
  

};


export default Login;

