import {
 MdEmail,
 MdPhone,
 MdLocationOn,
 MdOpenInNew,
 MdLanguage,
 
 MdBusinessCenter,
 MdCode,
} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";


interface CandidateContactProps {
 candidate: Candidate;
 compact?: boolean;
}
const CandidateContact = ({
 candidate,
 compact = false,
}: CandidateContactProps) => {
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
 ? "space-y-4"
 : " bg-white p-4 md:p-6 dark:border-zinc-700 dark:bg-zinc-900"
 }
 >

 {!compact && (
 <h2 className=" text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
 Contact Information
 </h2>
 )}

 <div className={compact ? "space-y-4" : "mt-6 space-y-4"}>

 {[
 {
 icon: <MdEmail />,
 label: "Email",
 value: candidate.email,
 link: `mailto:${candidate.email}`,
 },
 {
 icon: <MdPhone />,
 label: "Phone",
 value: candidate.phone,
 link: `tel:${candidate.phone}`,
 },
 {
 icon: <MdLocationOn />,
 label: "Location",
 value: candidate.location,
 },
 ].map((item) => (

 <div
 key={item.label}
 className="
 flex
 items-start
 gap-3
 md:items-center
 md:gap-4

 rounded-2xl
 border
 border-zinc-200
p-3
 md:p-4

 dark:border-zinc-700
 "
 >

 <div
 className="
 flex
 h-10
 w-10
 items-center
 justify-center

 rounded-xl

 bg-[#EEF8F3]

 text-[#408A71]

 dark:bg-[#408A71]/15
 dark:text-[#B0E4CC]
 "
 >
 {item.icon}
 </div>


 <div className="min-w-0 flex-1">

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {item.label}
 </p>

 {item.link ? (
 <a
 href={item.link}
 className="truncate font-semibold text-zinc-900 hover:text-[#408A71] dark:text-white"
 >
 {item.value}
 </a>
 ) : (
 <p className="font-semibold text-zinc-900 dark:text-white">
 {item.value}
 </p>
 )}

 </div>

 </div>

 ))}


 {/* Social Links */}

 {links.map((link) => (

 <a
 key={link.label}
 href={link.url}
 target="_blank"
 rel="noreferrer"
 className="
 flex
 items-center
 justify-between

 rounded-2xl
 border
 border-zinc-200

 p-3
 md:p-4

 transition

 hover:bg-zinc-50

 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >

 <div className="flex
 
gap-4
 rounded-xl


 text-[#408A71]

 
 dark:text-[#B0E4CC]
 ">

 {link.icon}

 <span className="font-semibold text-zinc-900 dark:text-white">
 {link.label}
 </span>

 </div>

 <MdOpenInNew className="text-zinc-400" />

 </a>

 ))}

 </div>

 </section>
);

};

export default CandidateContact;