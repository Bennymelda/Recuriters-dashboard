import CustomSelect from "../ui/CustomSelect";
import { useTeamStore } from "../../store/teamStore";

interface InterviewsToolbarProps {
 stage: string;
 setStage: (value: string) => void;

 interviewer: string;
 setInterviewer: (value: string) => void;
}

const InterviewsToolbar = ({
 stage,
 setStage,
 interviewer,
 setInterviewer,
}: InterviewsToolbarProps) => {
 const members = useTeamStore((state) => state.members);

 const interviewerOptions = members
 .filter(
 (member) =>
 member.role === "Recruiter" ||
 member.role === "HR Manager" ||
 member.role === "Hiring Manager"
 )
 .map((member) => member.fullName)
 .sort((a, b) => a.localeCompare(b));

 return (
 <section
 className="
 flex
 flex-col
 gap-4

 rounded-2xl

 border
 border-gray-200

 px-3
 py-3

 dark:border-zinc-800

 md:flex-row
 md:items-center
 md:justify-between
 "
>
 {/* Filters */}
 <div className="grid grid-cols-1 gap-3  md:flex md:items-center md:gap-4">

 <div className="w-full md:w-52">
 <CustomSelect
 placeholder="Interview Stage"
 value={stage}
 onChange={setStage}
 options={[
 "Screening",
 "Technical",
 "HR",
 "Final",
 ]}
 />
 </div>

 <div className="w-full md:w-52">
 <CustomSelect
 placeholder="Interviewer"
 value={interviewer}
 onChange={setInterviewer}
 options={interviewerOptions}
 />
 </div>

 </div>

 {/* Button */}
 <button
 onClick={() => {
 setStage("");
 setInterviewer("");
 }}
 className="
 w-full

 rounded-xl

 bg-[#285A48]

 px-4
 py-3

 text-sm
 font-medium
 text-white

 transition

 hover:bg-[#408A71]

 dark:bg-[#B0E4CC]
 dark:text-black
 dark:hover:bg-[#9FD8BF]

 sm:w-auto
 "
 >
 Clear Filters
 </button>
</section>
 );
};

export default InterviewsToolbar;