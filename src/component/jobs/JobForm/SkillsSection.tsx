import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

interface SkillsSectionProps {
 skills: string[];
 setSkills: (skills: string[]) => void;
}

const SkillsSection = ({
 skills,
 setSkills,
}: SkillsSectionProps) => {
 const [input, setInput] = useState("");

 const addSkill = () => {
 const value = input.trim();

 if (!value) return;

 // Prevent duplicates
 if (skills.includes(value)) {
 setInput("");
 return;
 }

 setSkills([...skills, value]);
 setInput("");
 };

 const removeSkill = (skill: string) => {
 setSkills(skills.filter((item) => item !== skill));
 };
const exists = skills.some(
 (skill) => skill.toLowerCase() === input.toLowerCase()
);

if (exists) {
 setInput("");
 return;
}
 return (
 <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
 <div className="mb-5">
 <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
 Skills
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Add the key skills required for this role.
 </p>
 </div>

 <div className="flex flex-col md:flex-row gap-3">
 <input
 type="text"
 value={input}
 placeholder="React, TypeScript..."
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={(e) => {
 if (e.key === "Enter") {
 e.preventDefault();
 addSkill();
 }
 }}
 className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-teal-900"
 />

 <button
 type="button"
 onClick={addSkill}
 className="flex items-center gap-2 rounded-xl dark:bg-[#B0E4CC] dark:text-black bg-[#285A48] px-5 py-3 font-medium text-white transition hover:bg-teal-700"
 >
 <MdAdd size={20} />
 Add
 </button>
 </div>

 <div className="mt-6 flex flex-wrap gap-3">
 {skills.length === 0 ? (
 <div className="w-full rounded-xl border border-dashed border-zinc-300 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
 No skills added yet.
 </div>
 ) : (
 skills.map((skill) => (
 <div
 key={skill}
 className="flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
 >
 <span>{skill}</span>

 <button
 type="button"
 onClick={() => removeSkill(skill)}
 className="rounded-full transition hover:text-red-500"
 >
 <MdClose size={16} />
 </button>
 </div>
 ))
 )}
 </div>
 </section>
 );
};

export default SkillsSection;