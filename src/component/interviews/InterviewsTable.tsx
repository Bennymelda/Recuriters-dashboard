//import { useCandidateStore } from "../../store/candidateStore";
import InterviewRow from "./InterviewRow";
import EmptyInterviews from "./EmptInterviews";
import type { Candidate, InterviewHistoryItem } from "../../types/candidate";

interface InterviewsTableProps {
 interviews: {
 candidate: Candidate;
 interview: InterviewHistoryItem;
 }[];
}
const InterviewsTable = ({
 interviews,
}: InterviewsTableProps) => {
 
 if (interviews.length === 0) {
 return <EmptyInterviews />;
 }

 return (
 <div
 className="
 mb-10
 rounded-3xl
 xl:border
 border-zinc-200
 xl:bg-white
 shadow-sm
 border-0
 dark:border-zinc-700
 dark:bg-zinc-900
 xl:dark:bg-zinc-800

 overflow-visible
 "
 >
 <div className="overflow-x-auto overflow-y-visible">
 <table className="w-full">
 <thead className="hidden xl:table-header-group border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50">
 <tr>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Candidate
 </th>

 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Stage
 </th>

 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Interviewer
 </th>

 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Date
 </th>

 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Status
 </th>

 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Outcome
 </th>

 <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
 Actions
 </th>
 </tr>
 </thead>

 <tbody className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:table-row-group xl:gap-0">
 {interviews.map(({ candidate, interview }) => (
 <InterviewRow
 key={interview.id}
 candidate={candidate}
 interview={interview}
 />
 ))}
 </tbody>
 </table>
 </div>
 </div>
);
};

export default InterviewsTable;