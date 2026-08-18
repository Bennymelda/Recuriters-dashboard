import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCandidateStore } from "../../../store/candidateStore";

import CandidateProfileHeader from "./CandidateProfileHeader";

import CandidateContact from "./CandidateContact";
import CandidateApplication from "./CandidateApplication";

import CandidateInterviewHistory from "./CandidateInterviewHistory";
import CandidateNotes from "./CandidateNotes";
import CandidateActions from "./CandidateActions";
import CandidateTabs from "./ActiveState";
import Breadcrumb from "../../ui/BreadCrumb";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";

const CandidateProfilePage = () => {
 const { id } = useParams();
  const navigate=useNavigate()
  const [activeTab, setActiveTab] = useState("application");
const location = useLocation();

useEffect(() => {
 if (location.state?.tab) {
 setActiveTab(location.state.tab);
 }
}, [location.state]);


 const candidate = useCandidateStore((state) =>
 state.candidates.find((candidate) => candidate.id === id)
 );

 if (!candidate) {
 return (
 <div className="flex h-[70vh] items-center justify-center">
 <h2 className="text-xl font-semibold text-slate-500">
 Candidate not found.
 </h2>
 </div>
 );
 }

 return (
 <div className="">

{/* Back */}
<div className="mb-6 flex flex-wrap items-center gap-4">

 {/* Back Button */}
 <button
 onClick={() => navigate("/candidates")}
 className="
 group
 flex
 items-center
 gap-2

 rounded-xl

 border
 border-zinc-200

 bg-white

 px-4
 py-2

 text-sm
 font-medium

 text-zinc-600

 transition-all
 duration-300

 hover:-translate-x-1
 hover:border-[#408A71]/30
 hover:bg-[#EEF8F3]
 hover:text-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 dark:hover:text-[#B0E4CC]
 "
 >
 <MdArrowBack
 size={18}
 className="transition-transform group-hover:-translate-x-1"
 />

 Back
 </button>

 {/* Divider */}
 <div className="hidden h-6 w-px bg-zinc-300 dark:bg-zinc-700 md:block" />

 {/* Breadcrumb */}
 <Breadcrumb
 items={[
 {
 label: "candidates",
 href: "/candidates",
 },
 {
 label: candidate.fullName,
 },
 ]}
 />

</div>

<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:flex-row justify-between ">
    <div>
        <div className="flex-1">
<CandidateProfileHeader  />
        </div>

    </div>
    <div className="w-full  lg:w-[400px]">
<CandidateContact candidate={candidate} />
    </div>
 
 

</div>
 {/* Left Sidebar */}
 <aside className="">



 

 </aside>


 {/* Main Content */}
 <main>

 

 <CandidateActions candidate={candidate} />
 </main>
<CandidateTabs
 activeTab={activeTab}
 setActiveTab={setActiveTab}
 application={<CandidateApplication candidate={candidate} />}
 interviews={<CandidateInterviewHistory candidate={candidate} />}
 notes={<CandidateNotes candidate={candidate} />}
/>
</div>
 );
};

export default CandidateProfilePage;

