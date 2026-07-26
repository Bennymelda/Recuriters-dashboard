import {
 MdDescription,
 MdVisibility,
 MdDownload,
} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";

interface CandidateResumeProps {
 candidate: Candidate;
 compact?: boolean;
}

const CandidateResume = ({
 candidate,
  compact = false,
}: CandidateResumeProps) => {
 return (
<section
 className={
 compact
 ? "space-y-5"
 : " bg-white p-4 md:p-6  dark:border-zinc-700 dark:bg-zinc-900"
 }
>

 {/* Header */}

 <div>

 



 </div>

 {candidate.resumeUrl ? (

 <div className="mt-2 overflow-hidden  border-zinc-200 dark:border-zinc-700">

 {/* Resume Info */}

 <div className="flex flex-col  md:flex-row  md:justify-between items-start border-b border-zinc-200 px-4 py-5 dark:border-zinc-700 gap-4">

 <div className="flex items-center gap-4">

 <div className="flex h-10 md:h-12 w-10 md:w-12 items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">

 <MdDescription
 size={24}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />

 </div>

 <div>

 <p className="font-semibold text-zinc-900 dark:text-white">
 Candidate Resume
 </p>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 PDF Document
 </p>

 </div>

 </div>

 <span className="rounded-full text-center bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
 Available
 </span>

 </div>

 {/* Actions */}

 <div className="flex gap-3 md:gap-4 md:flex-row p-4 md:p-6 flex-col ">

 <a
 href={candidate.resumeUrl}
 target="_blank"
 rel="noreferrer"
 className="
 flex-1
 rounded-2xl
 border
 border-zinc-300
 px-5
 py-3

 text-center
 font-medium

 text-zinc-700

 transition

 hover:bg-zinc-100

 dark:border-zinc-700
 dark:text-zinc-200
 dark:hover:bg-zinc-800
 "
 >
 <div className="flex items-center justify-center gap-2">
 <MdVisibility size={20} />
 View Resume
 </div>
 </a>

 <a
 href={candidate.resumeUrl}
 download
 className="
 flex-1
 rounded-2xl
 bg-[#408A71]
 px-4 sm:px-5
 py-3

 text-center
 font-medium
 text-white

 transition

 hover:bg-[#2F6D58]
 "
 >
 <div className="flex items-center justify-center gap-2">
 <MdDownload size={20} />
 Download
 </div>
 </a>

 </div>

 </div>

 ) : (

 <div className="mt-8  border-zinc-300 bg-zinc-50 py-10 md:py-14 text-center dark:border-zinc-700 dark:bg-zinc-800/50">

 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF8F3] dark:bg-[#408A71]/15">

 <MdDescription
 size={28}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />

 </div>

 <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
 No Resume Uploaded
 </h3>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 This candidate hasn't uploaded a resume yet.
 </p>

 </div>

 )}

</section>
 );
};

export default CandidateResume;