import {
 MdEvent,
 MdPerson,
} from "react-icons/md";

import useUpcomingInterviews from "./hooks/useUpcomingInterview";

const DashboardUpcomingInterviews = () => {
 const { upcomingInterviews } =
 useUpcomingInterviews();


 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >

 <div className="mb-6">

 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Upcoming Interviews
 </h2>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Interviews scheduled with candidates.
 </p>

 </div>


 <div className="space-y-4">

 {upcomingInterviews.map((interview) => (

 <div
 key={interview.id}
 className="
 flex
 items-center
 justify-between
 rounded-2xl
 border
 border-zinc-200
 p-4
 transition
 hover:shadow-md

 dark:border-zinc-700
 "
 >

 <div className="flex items-center gap-4">


 <img
 src={
 interview.candidateAvatar ||
 `https://ui-avatars.com/api/?name=${interview.candidateName}`
 }
 alt={interview.candidateName}
 className="
 h-12
 w-12
 rounded-full
 object-cover
 "
 />


 <div>

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {interview.candidateName}
 </h3>


 <p className="text-sm text-zinc-500">
 {interview.appliedRole}
 </p>


 <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">

 <MdPerson size={15}/>

 {interview.interviewerName}

 </div>

 </div>


 </div>



 <div
 className="
 rounded-2xl
 bg-[#EEF8F3]
 px-4
 py-3
 text-right

 dark:bg-[#285A48]/20
 "
 >

 <div
 className="
 flex
 items-center
 gap-2
 text-sm
 font-semibold
 text-[#285A48]

 dark:text-[#B0E4CC]
 "
 >

 <MdEvent size={16}/>

 {interview.stage}

 </div>


 <p className="mt-1 text-xs text-zinc-500">

 {
 new Date(interview.date)
 .toLocaleDateString(
 "en-US",
 {
 month: "short",
 day: "numeric",
 }
 )
 }

 </p>


 </div>


 </div>

 ))}



 {upcomingInterviews.length === 0 && (

 <div
 className="
 rounded-2xl
 border
 border-dashed
 border-zinc-300
 p-6
 text-center
 text-sm
 text-zinc-500

 dark:border-zinc-700
 "
 >

 No upcoming interviews.

 </div>

 )}

 </div>


 </section>
 );
};


export default DashboardUpcomingInterviews;