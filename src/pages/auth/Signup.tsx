import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyStore";
import { useAuthStore } from "../../store/authStore";


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
 Create your workspace
 </h1>


 <p
 className="
 mt-2
 text-sm
 text-zinc-500
 "
 >
 Start managing your hiring team.
 </p>

 </div>



 <form
 onSubmit={handleSubmit}
 className="space-y-5"
 >


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
 focus:border-[hashtag#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />



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
 focus:border-[hashtag#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />



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
 focus:border-[hashtag#408A71]

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
 focus:border-[hashtag#408A71]

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />



 <button
 type="submit"
 className="
 w-full
 rounded-2xl
 bg-[hashtag#408A71]
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[hashtag#285A48]
 "
 >
 Create Account
 </button>


 </form>



 </div>

 </div>
 );
};


export default Signup;

