import { MdGroups } from "react-icons/md";

const TeamEmpty = () => {
 return (
 <section
 className="
 mt-8

 flex
 min-h-[450px]
 flex-col
 items-center
 justify-center

 rounded-3xl

 border-2
 border-dashed
 border-zinc-300

 bg-white

 p-8
 text-center

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div
 className="
 flex
 h-20
 w-20
 items-center
 justify-center

 rounded-full

 bg-[#EEF8F3]

 dark:bg-[#408A71]/15
 "
 >
 <MdGroups
 size={42}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />
 </div>

 <h2 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
 No Team Members Yet
 </h2>

 <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Build your hiring team by adding recruiters, hiring managers,
 interviewers, and HR staff. Once added, they'll appear here for
 collaboration and workload management.
 </p>

 <button
 className="
 mt-8

 rounded-2xl

 bg-[#408A71]

 px-6
 py-3

 text-sm
 font-semibold

 text-white

 transition
 duration-300

 hover:bg-[#35745E]
 "
 >
 Add First Team Member
 </button>
 </section>
 );
};

export default TeamEmpty;