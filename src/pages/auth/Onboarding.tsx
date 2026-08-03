import { useNavigate } from "react-router-dom";
import {
 MdBusiness,
 MdPeople,
} from "react-icons/md";

import { useAuthStore } from "../../store/authStore";


const SelectRole = () => {

 const navigate = useNavigate();

 const setRole = useAuthStore(
 (state) => state.setRole
 );


 const handleRoleSelect = (
 role: "Admin" | "Recruiter"
 ) => {

 setRole(role);

 navigate("/dashboard");

 };


 return (
 <div
 className="
 flex
 min-h-screen
 items-center
 justify-center
 bg-white
 px-4
shadow-sm
 dark:bg-zinc-950
 "
 >

 <div
 className="
 w-full
 max-w-3xl
 rounded-3xl
 border
 border-zinc-100
 bg-white
 px-10
 py-10
 shadow-md

 dark:border-zinc-800
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
 How will you use RecruitFlow?
 </h1>


 <p
 className="
 mt-2
 text-zinc-500
 dark:text-gray-300
 "
 >
 Choose your role to personalize your experience.
 </p>

 </div>



 <div
 className="
 grid
 gap-6
 md:grid-cols-2
 "
 >

 <button
 onClick={() => handleRoleSelect("Admin")}
 className="
 rounded-3xl
 border
 border-zinc-200
 p-6
 text-left
 transition
 hover:-translate-y-1
 hover:border-[#408A71]
 hover:shadow-lg

 dark:border-zinc-700
 "
 >

 <div
 className="
 mb-4
 flex
 h-14
 w-14
 items-center
 justify-center
 rounded-2xl
 bg-[#EEF8F3]
 text-[#408A71]
 "
 >
 <MdBusiness size={28}/>
 </div>


 <h2
 className="
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Create a hiring team
 </h2>


 <p
 className="
 mt-2
 text-sm
 text-zinc-500
 dark:text-gray-300
 "
 >
 Admin or Hiring Manager. Manage jobs,
 recruiters, and the hiring process.
 </p>


 </button>




 <button
 onClick={() => handleRoleSelect("Recruiter")}
 className="
 rounded-3xl
 border
 border-zinc-200
 p-6
 text-left
 transition
 hover:-translate-y-1
 hover:border-[#408A71]
 hover:shadow-lg

 dark:border-zinc-700
 "
 >

 <div
 className="
 mb-4
 flex
 h-14
 w-14
 items-center
 justify-center
 rounded-2xl
 bg-blue-50
 text-blue-600
 "
 >
 <MdPeople size={28}/>
 </div>


 <h2
 className="
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Join a recruitment team
 </h2>


 <p
 className="
 mt-2
 text-sm
 dark:text-gray-300
 text-zinc-500
 "
 >
 Recruiter. Manage candidates,
 interviews, and hiring tasks.
 </p>


 </button>


 </div>


 </div>

 </div>
 );
};


export default SelectRole;

