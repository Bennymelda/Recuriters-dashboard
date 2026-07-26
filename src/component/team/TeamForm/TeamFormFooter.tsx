interface TeamFormFooterProps {
 submitLabel: string;
 onCancel: () => void;
 onSubmit: () => void;
}

const TeamFormFooter = ({
 submitLabel,
 onCancel,
 onSubmit,
}: TeamFormFooterProps) => {
 return (
 <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-700">

 <button
 type="button"
 onClick={onCancel}
 className="
 rounded-xl
 border
 border-zinc-300
 px-5
 dark:text-white
 py-2.5
 text-sm
 font-medium
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 Cancel
 </button>

 <button
 type="button"
 onClick={onSubmit}
 className="
 rounded-xl
 bg-[#408A71]
 px-5
 py-2.5
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-[#35745E]
 "
 >
 {submitLabel}
 </button>

 </div>
 );
};

export default TeamFormFooter;