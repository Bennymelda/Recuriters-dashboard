import { MdAdd, MdEvent } from "react-icons/md";
import { useNavigate } from "react-router";

const InterviewsHeader = () => {
    const navigate =useNavigate()
 return (
 <header
 className="
 flex flex-col gap-6
 rounded-3xl
 border border-zinc-200
 bg-white
 p-6
 shadow-sm
 dark:border-zinc-800
 dark:bg-zinc-900

 lg:flex-row
 lg:items-center
 lg:justify-between
 lg:p-8
 "
 >
 {/* Left */}
 <div className="flex items-start gap-4">
 {/* Icon */}
 <div
 className="
 flex h-12 md:h-16  w-12 md:w-16 shrink-0 items-center justify-center
 rounded-2xl
 bg-[#EEF8F3]
 text-[#408A71]
 shadow-sm

 dark:bg-[#408A71]/15
 dark:text-[#B0E4CC]
 "
 >
 <MdEvent size={30} />
 </div>

 {/* Text */}
 <div>
 <p
 className="
 text-xs
 font-semibold
 uppercase
 tracking-[0.22em]
 text-[#408A71]
 dark:text-[#B0E4CC]
 "
 >
 Recruitment Interviews
 </p>

 <h1
 className="
 mt-2
 text-3xl
 font-bold
 tracking-tight
 text-zinc-900
 dark:text-white
 "
 >
 Interviews
 </h1>

 <p
 className="
 mt-3
 max-w-2xl
 text-sm
 leading-7
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Schedule interviews, monitor upcoming sessions, review completed
 interviews, and keep every candidate's interview journey organized
 from one place.
 </p>
 </div>
 </div>

 {/* Right */}
 <button
 onClick={() => navigate("/pipeline")}
 className="
 inline-flex
 w-full
 items-center
 justify-center
 gap-2

 rounded-2xl
 bg-[#285A48]
 px-6
 py-3.5

 text-sm
 font-semibold
 text-white

 shadow-lg
 shadow-[#285A48]/20

 transition-all
 duration-300

 hover:-translate-y-0.5
 hover:bg-[#367760]
 hover:shadow-xl
whitespace-nowrap
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 dark:shadow-[#B0E4CC]/20
 dark:hover:bg-[#9DD8BE]

 sm:w-auto
 "
 >
 <MdAdd size={20} />
 Schedule Interview
 </button>
 </header>
);
};

export default InterviewsHeader