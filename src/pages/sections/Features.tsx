import { FaBahai, FaUsers } from "react-icons/fa6";

import {FaRegCalendarAlt } from "react-icons/fa";

import { MdOutlineAnalytics } from "react-icons/md";
import { MdOutlineCollections } from "react-icons/md";
import { IoGitNetworkSharp } from "react-icons/io5";

const Features = () => {
    return ( <>
    <section id="features" className="py-5 mt-15 max-w-container-max mx-auto px-gutter">
<div className="text-center max-w-2xl mx-auto mb-10">
<h2 className="md:text-4xl mb-2 text-2xl font-bold text-gray-900 mb-sm dark:text-white">Everything you need to hire the best</h2>
<p className="font-body-md text-gray-700 md:text-lg dark:text-gray-300">Say goodbye to spreadsheets. CareerFlow provides a centralized platform for your entire hiring lifecycle.</p>
</div>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
<div 
className="
 p-4
bg-white
dark:bg-zinc-900
 rounded-xl 
 shadow 
 border border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-[#408A71]
 transition-all 
 duration-500 
 ease-out
 group 
 flex 
 flex-col 
 gap-2
 "
>
<div 
 className="
 w-12 
 h-12 
 bg-[#cfe8e0]
 dark:bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 ">
<FaUsers className="material-symbols-outlined text-[#285A48] " data-icon="alt_route" />
</div>
<h3 className="font-headline-sm text-xl md:text-2xl font-semibold mb-2 dark:text-white">Candidate Management</h3>
<p className="text-gray-700 md:text-lg dark:text-gray-300">A unified database for all applicant information, resumes, and communications history.</p>
</div>
<div 
 
 className="
 p-4
bg-[#285A48]
dark:bg-[#B0E4CC]
 rounded-xl 
 shadow 
 border-2 border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-gray-50
 transition-all 
 duration-500 
 ease-out
 group 
 flex 
 flex-col 
 gap-2
 "
>
<div 
 className="
 w-12 
 h-12 
 bg-[#cfe8e0]
 dark:bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 ">
<FaRegCalendarAlt className=" text-[#285A48]" data-icon="alt_route" />


</div>
<h3 className="font-headline-sm text-white text-xl md:text-2xl font-semibold mb-2 dark:text-zinc-900">Smart Hiring Pipeline</h3>
<p className=" text-gray-200 dark:text-gray-700 md:text-lg">Drag-and-drop workflows that automatically trigger actions at every stage of the process.</p>
</div>
<div
className="
 p-4 
 bg-white 
 
dark:bg-zinc-900
 rounded-xl 
 shadow 
 border border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-[#408A71]
 transition-all 
 duration-500 
 ease-out
 group 
 flex 
 flex-col 
 gap-2
 "
>
<div 
 className="
 w-12 
 h-12 
 bg-[#cfe8e0]
 dark:bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 ">
<IoGitNetworkSharp
 className=" text-[#285A48]" data-icon="calendar_month" />

</div>
<h3 className="font-headline-sm text-xl md:text-2xl dark:text-white font-semibold mb-2">Interview Scheduling</h3>
<p className="text-gray-700 md:text-lg dark:text-gray-300">Automated scheduling that syncs with your team's calendars and sends reminders instantly.</p>
</div>
<div 
className="
 p-4 
 bg-white 
 dark:bg-zinc-900
 rounded-xl 
 shadow 
 border border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-[#408A71]
 transition-all 
 duration-500 
 ease-out
 group 
 flex 
 flex-col 
 gap-2
 "
>
<div 
 className="
 w-12 
 h-12 
 bg-[#cfe8e0]
 dark:bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 ">
<MdOutlineAnalytics className=" text-[#285A48]" data-icon="analytics" />

</div>
<h3 className="font-headline-sm text-xl dark:text-white  md:text-2xl font-semibold mb-2">Recruitment Analytics</h3>
<p className="text-gray-700 md:text-lg dark:text-gray-300">Deep insights into time-to-hire, source quality, and bottleneck identification.</p>
</div>
<div
 className="
 p-4 
 bg-white 
 dark:bg-zinc-900
 rounded-xl 
 shadow 
 border border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-[#408A71]
 transition-all 
 duration-500 
 ease-out
 group 
 flex 
 flex-col 
 gap-2
 "
>
 <div
 className="
 w-12 
 h-12 
 bg-[#aadaca]
 dark:bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 "
 >
 <MdOutlineCollections className="text-[#285A48]" />
 </div>

 <h3 className="dark:text-white  font-headline-sm text-xl md:text-2xl font-semibold mb-2">
 Team Collaboration
 </h3>

 <p className="text-gray-700 md:text-lg dark:text-gray-300">
 Shared feedback loops and scorecard systems to keep everyone aligned on
 candidate quality.
 </p>
</div>


<div
 className="
 p-4 
 bg-white 
 dark:bg-zinc-800
 rounded-xl 
 shadow 
 border border-transparent
 hover:-translate-y-2
 hover:shadow-xl 
 hover:shadow-[#aadaca]/30
 hover:border-[#408A71]
 transition-all 
 duration-500 
 ease-out
 group
 flex
 flex-col
 gap-2
 "
>
 <div
 className="
 w-12 
 h-12 
 bg-[#aadaca] 
 rounded-lg 
 flex 
 items-center 
 justify-center
 group-hover:scale-110
 transition-transform
 duration-500
 ease-out
 "
 >
 <FaBahai className="text-[#285A48]" />
 </div>

 <h3 className="dark:text-white  font-headline-sm text-xl md:text-2xl font-semibold mb-2">
 AI-Powered Matching
 </h3>

 <p className="text-gray-700 md:text-lg dark:text-gray-300">
 Advanced algorithms that highlight the most qualified candidates based on
 your job requirements.
 </p>
</div>


</div>
</section>
    </> );
}
 
export default Features;