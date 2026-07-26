import {
 MdCode,
 MdBusinessCenter,
 MdLanguage,
 MdOpenInNew,
} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";

interface CandidateLinksProps {
 candidate: Candidate;
  compact?: boolean;
}

const CandidateLinks = ({
 candidate,
 compact = false,
}: CandidateLinksProps) => {
 const links = [
 {
 label: "GitHub",
 url: candidate.github,
 icon: <MdCode size={20} />,
 },
 {
 label: "LinkedIn",
 url: candidate.linkedin,
 icon: <MdBusinessCenter size={20} />,
 },
 {
 label: "Portfolio",
 url: candidate.portfolio,
 icon: <MdLanguage size={20} />,
 },
 ].filter((link) => link.url);

 return (
 <section
 className={
 compact
 ? "space-y-5"
 : "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
 }
>
 {!compact && (
 <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
 Link
 </h2>
)}

 {links.length === 0 ? (
 <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center dark:bg-slate-800">
 <p className="text-sm text-slate-500">
 No professional links available.
 </p>
 </div>
 ) : (
 <div className={compact ? "space-y-4" : "mt-6 space-y-5"}>

 {links.map((link) => (
 <a
 key={link.label}
 href={link.url}
 target="_blank"
 rel="noreferrer"
 className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
 >
 <div className="flex items-center gap-3">
 <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
 {link.icon}
 </div>

 <span className="font-medium text-slate-900 dark:text-white">
 {link.label}
 </span>
 </div>

 <MdOpenInNew className="text-slate-500" />
 </a>
 ))}

 </div>
 )}

 </section>
 );
};

export default CandidateLinks;