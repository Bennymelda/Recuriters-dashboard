import { MdEventBusy } from "react-icons/md";
import { useNavigate } from "react-router";

const EmptyInterviews = () => {
    const navigate=useNavigate()
 return (
 <div
 className="
 flex
 min-h-[420px]
 flex-col
 items-center
 justify-center
 rounded-3xl
 border
 border-dashed
 border-zinc-300
 bg-white
 p-10
 text-center
 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 <div
 className="
 mb-6
 flex
 h-20
 w-20
 items-center
 justify-center
 rounded-full
 bg-[#EEF8F3]
 dark:bg-zinc-900
 "
 >
 <MdEventBusy
 size={42}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />
 </div>

 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
 No Interviews Scheduled
 </h2>

 <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 There are no scheduled interviews at the moment. Once you schedule an
 interview from the hiring pipeline, it will appear here for you to
 manage.
 </p>

 <button
 onClick={()=>navigate("/pipeline")}
 
 className="
 cursor-pointer
 mt-8
 rounded-2xl
 bg-[#408A71]
 px-6
 py-3
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-[#367760]
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 dark:hover:bg-[#9DD8BE]
 "
 
 >
 Schedule Interview
 </button>
 </div>
 );
};

export default EmptyInterviews;