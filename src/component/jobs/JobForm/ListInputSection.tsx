import { useState } from "react";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

interface ListInputSectionProps {
 title: string;
 placeholder: string;
 items: string[];
 setItems: (items: string[]) => void;
}

const ListInputSection = ({
 title,
 placeholder,
 items,
 setItems,
}: ListInputSectionProps) => {
 const [input, setInput] = useState("");

 const addItem = () => {
 const value = input.trim();

 if (!value) return;

 setItems([...items, value]);
 setInput("");
 };

 const removeItem = (index: number) => {
 setItems(items.filter((_, i) => i !== index));
 };

 return (
 <section className="rounded-2xl border border-zinc-200 bg-white p-4 md:p-6 dark:border-zinc-800 dark:bg-zinc-900">
 <h2 className="mb-5 text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 {title}
 </h2>

 <div className="flex flex-col md:flex-row gap-3">
 <input
 type="text"
 value={input}
 placeholder={placeholder}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={(e) => {
 if (e.key === "Enter") {
 e.preventDefault();
 addItem();
 }
 }}
 className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-teal-900"
 />

 <button
 type="button"
 onClick={addItem}
 className="flex  py-2 justify-center items-center gap-2 rounded-xl dark:bg-[#B0E4CC] dark:text-black bg-[#285A48] px-5 text-white transition hover:bg-teal-700"
 >
 <MdAdd size={20} />
 Add
 </button>
 </div>

 <div className="mt-6 space-y-3">
 {items.length === 0 ? (
 <div className="rounded-xl border border-dashed border-zinc-300 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
 No {title.toLowerCase()} added yet.
 </div>
 ) : (
 items.map((item, index) => (
 <div
 key={index}
 className="flex items-start justify-between rounded-xl gap-3 border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
 >
 <span className="flex-1 break-words text-sm text-zinc-700 dark:text-zinc-200">
 {item}
 </span>

 <button
 type="button"
 onClick={() => removeItem(index)}
 className="rounded-lg p-2 text-red-500 transition hover:bg-red-100 dark:hover:bg-red-900/30"
 >
 <MdDeleteOutline size={18} />
 </button>
 </div>
 ))
 )}
 </div>
 </section>
 );
};

export default ListInputSection;