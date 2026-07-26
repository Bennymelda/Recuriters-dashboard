import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface AddNoteModalProps {
 open: boolean;
 initialValue?: string;
 isEditing?: boolean;
 onClose: () => void;
 onSave: (content: string) => void;
}



const AddNoteModal = ({
 open,
 onClose,
 onSave,
 initialValue,
 isEditing,
}: AddNoteModalProps) => {

 const [note, setNote] = useState(initialValue ?? "");
const handleClose = () => {
 setNote(initialValue ?? "");
 onClose();
};
useEffect(() => {
 setNote(initialValue ?? "");
}, [initialValue]);
 if (!open) return null;

 const handleSave = () => {
 if (!note.trim()) return;

 onSave(note);
 setNote("");
 onClose();
 };

 








 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm "
 />

 {/* Modal */}
 <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">

 <div className="mb-6 flex items-center justify-between">

 <h2 className="text-xl font-semibold dark:text-white">
 {isEditing ? "Edit Recruiter Note" : "Add Recruiter Note"}
</h2>

 <button onClick={onClose} className="dark:text-white text-black">
 <MdClose size={22} />
 </button>

 </div>

 <textarea
 rows={6}
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Write your note..."
 className="w-full rounded-xl border  border-zinc-300 bg-transparent dark:text-white p-4 outline-none focus:border-[#285A48] dark:focus:border-[#B0E4CC] dark:border-zinc-700"
 />

 <div className="mt-6 flex justify-end gap-3">

 <button
 onClick={handleClose}
 className="rounded-xl border dark:bg-white font-semibold shadow border-zinc-300 px-5 py-2"
 >
 Cancel
 </button>

 <button
 onClick={handleSave}
 className="rounded-xl bg-[#285A48] dark:bg-[#B0E4CC] px-5 py-2 font-semibold text-white hover:bg-teal-700 dark:text-black"
>
 {isEditing ? "Save Changes" : "Save Note"}
</button>

 </div>

 </div>
 </>
 );
};

export default AddNoteModal;