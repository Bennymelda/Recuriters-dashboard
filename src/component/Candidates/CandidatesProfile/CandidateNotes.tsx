import {
 MdNotes,

 MdCalendarToday,
 MdAdd,
} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";
import { useCandidateStore } from "../../../store/candidateStore";
import { useState } from "react";
import AddNoteModal from "./AddNoteModal";
import {
 MdMoreVert,
 MdEdit,
 MdDelete,
} from "react-icons/md";
interface CandidateNotesProps {
 candidate: Candidate;
}

const CandidateNotes = ({
 candidate,
}: CandidateNotesProps) => {

const formatInterviewDate = (date: string) => {
 const d = new Date(date);

 const day = d.getDate();

 const suffix =
 day % 10 === 1 && day !== 11
 ? "st"
 : day % 10 === 2 && day !== 12
 ? "nd"
 : day % 10 === 3 && day !== 13
 ? "rd"
 : "th";

 const month = d.toLocaleString("en-US", {
 month: "short",
 });

 const year = d.getFullYear();

 return `${day}${suffix} ${month} ${year}`;
};
const [openModal, setOpenModal] = useState(false);
const [activeMenu, setActiveMenu] = useState<string | null>(null);
const addNote = useCandidateStore((state) => state.addNote);

const [editingNote, setEditingNote] = useState<Candidate["notes"][number] | null>(null);

const updateNote = useCandidateStore((state) => state.updateNote);
const deleteNote = useCandidateStore((state) => state.deleteNote);

const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
const handleDeleteNote = (noteId: string) => {
 setNoteToDelete(noteId);
};

const handleEditNote = (
 note: Candidate["notes"][number]
) => {
 setEditingNote(note);
 setOpenModal(true);
};

 return (
<section className="rounded-3xl border border-zinc-200 bg-white p-4 md:p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">

 {/* Header */}
 <div className="flex flex-col gao-4 md:flex-row  md:items-center md:justify-between">

 <div>

 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#408A71] dark:text-[#B0E4CC]">
 Internal Notes
 </p>

 <h2 className="mt-2 text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
 Recruiter Notes
 </h2>




 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Private notes shared between recruiters during the hiring process.
 </p>

 </div>

 <button
 onClick={() => {
 setOpenModal(true);
 }}
 className="
 flex
 items-center
 gap-2
 curdor-pointer

 rounded-2xl
w-full
md:w-auto
 bg-[#408A71]
px-4
mt-4
justify-center
 md:px-5
 py-3

 text-sm
 font-semibold
 text-white

 shadow-sm

 transition-all
 duration-300

 hover:-translate-y-0.5
 hover:bg-[#2F6D58]
 hover:shadow-lg

 active:scale-95
 "
 >
 <MdAdd size={20} />
 Add Note
 </button>

 </div>

 {candidate.notes.length === 0 ? (

 <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 py-10 md:py-14 text-center dark:border-zinc-700 dark:bg-zinc-800/50">

 <MdNotes
 size={34}
 className="mx-auto text-[#408A71] dark:text-[#B0E4CC]"
 />

 <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
 No recruiter notes
 </h3>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Notes added by recruiters will appear here.
 </p>

 </div>

 ) : (

 <div className="mt-8 space-y-6">

 {candidate.notes.map((note) => (

 <div
 key={note.id}
 className="
 rounded-3xl
 border
 border-zinc-200
 p-4 md:p-6
 transition-all
 duration-300
 hover:shadow-md
 dark:border-zinc-700
 "
 >

 {/* Top */}
 <div className="flex items-center justify-between">

 <div className="flex items-center gap-4">

 <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#EEF8F3] font-semibold text-[#408A71] dark:bg-[#408A71]/15 dark:text-[#B0E4CC]">
 {note.author.charAt(0)}
 </div>

 <div>

 <h4 className="font-semibold text-zinc-900 dark:text-white">
 {note.author}
 </h4>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Recruiter
 </p>

 </div>

 </div>

 <div className="flex items-center justify-between">

 {/* Date */}
 <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
 <MdCalendarToday size={16} />
 <span>{formatInterviewDate(note.date)}</span>
 </div>

 {/* Actions */}
 <div className="relative">

 <button
 onClick={() =>
 setActiveMenu(activeMenu === note.id ? null : note.id)
 }
 className="
 rounded-xl
 p-2
 text-zinc-500
 transition-all
 duration-200

 hover:bg-zinc-100
 hover:text-zinc-900

 dark:text-zinc-400
 dark:hover:bg-zinc-800
 dark:hover:text-white
 cursor-pointer
 "
 >
 <MdMoreVert size={20} />
 </button>

 {activeMenu === note.id && (
 <div
 className="
 absolute
 right-0
 top-12
 z-20

 w-48

 overflow-hidden
 rounded-2xl

 border
 border-zinc-200

 bg-white

 py-2

 shadow-xl

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >

 <button
 onClick={() => {
 handleEditNote(note);
 setActiveMenu(null);
 }}
 className="
 flex
 w-full
 items-center
 gap-3

 px-4
 cursor-pointer
 py-3

 text-sm
 font-medium

 text-zinc-700

 transition

 hover:bg-zinc-100

 dark:text-zinc-300
 dark:hover:bg-zinc-800
 "
 >
 <MdEdit size={18} />
 Edit Note
 </button>

 <button
 onClick={() => {
 handleDeleteNote(note.id);
 setActiveMenu(null);
 }}
 className="
 cursor-pointer
 flex
 w-full
 items-center
 gap-3

 px-4
 py-3

 text-sm
 font-medium

 text-red-600

 transition

 hover:bg-red-50

 dark:hover:bg-red-900/20
 "
 >
 <MdDelete size={18} />
 Delete Note
 </button>

 </div>
 )}

 </div>

</div>

 </div>

 {/* Note */}
 <div className="mt-6 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800">

 <p className="leading-7 text-zinc-700 dark:text-zinc-300">
 {note.content}
 </p>

 </div>

 </div>

 ))}

 </div>

 )}


{noteToDelete && (
 <div
 className="
 fixed
 inset-0
 z-50
 flex
 items-center
 justify-center
 bg-black/40
 px-4
 backdrop-blur-sm
 "
 >
 <div
 className="
 w-full
 max-w-md
 rounded-2xl
 bg-white
 p-6
 shadow-2xl

 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div>
 <h2
 className="
 text-lg
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Delete note?
 </h2>

 <p
 className="
 mt-2
 text-sm
 leading-6
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Are you sure you want to delete this note?
 This action cannot be undone.
 </p>
 </div>

 {/* Actions */}
 <div className="mt-6 flex justify-end gap-3">
 <button
 type="button"
 onClick={() => setNoteToDelete(null)}
 className="
 rounded-xl
 border
 border-zinc-200
 px-4
 py-2.5
 text-sm
 font-semibold
 text-zinc-700
 transition
 hover:bg-zinc-50

 dark:border-zinc-700
 dark:text-zinc-200
 dark:hover:bg-zinc-800
 "
 >
 Cancel
 </button>

 <button
 type="button"
 onClick={() => {
 deleteNote(candidate.id, noteToDelete);
 setNoteToDelete(null);
 }}
 className="
 rounded-xl
 bg-red-500
 px-4
 py-2.5
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-red-600
 "
 >
 Delete
 </button>
 </div>
 </div>
 </div>
)}

<AddNoteModal
 open={openModal}
 initialValue={editingNote?.content ?? ""}
 isEditing={editingNote !== null}
 onClose={() => {
 setOpenModal(false);
 setEditingNote(null);
 }}
 onSave={(content) => {
 if (editingNote) {
 updateNote(
 candidate.id,
 editingNote.id,
 content
 );
 } else {
 addNote(candidate.id, {
 author: "Benny",
 content,
 });
 }

 setEditingNote(null);
 }}
/>
</section>
 );
};

export default CandidateNotes;