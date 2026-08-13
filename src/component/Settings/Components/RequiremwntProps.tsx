import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

interface RequirementProps {
 met: boolean;
 text: string;
}

export const Requirement = ({ met, text }: RequirementProps) => {
 return (
 <li
 className={`flex items-center gap-3 text-sm transition ${
 met
 ? "text-green-600 dark:text-green-400"
 : "text-zinc-500 dark:text-zinc-300"
 }`}
 >
 {met ? (
 <MdCheckCircle size={18} />
 ) : (
 <MdRadioButtonUnchecked size={18} />
 )}

 <span>{text}</span>
 </li>
 );
};