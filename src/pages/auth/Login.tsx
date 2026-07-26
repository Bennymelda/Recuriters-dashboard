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
};


export default Login;

