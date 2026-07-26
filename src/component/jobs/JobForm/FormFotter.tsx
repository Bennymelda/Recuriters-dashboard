interface FormFooterProps {
 mode: "create" | "edit";
 loading?: boolean;
 onCancel: () => void;
}

const FormFooter = ({
 mode,
 loading = false,
 onCancel,
}: FormFooterProps) => {
 return (
 <div className="sticky bottom-0 flex flex-col-reverse  items-center md:flex-row md:gap-4 md:px-6 md:py-5 md:justify-end gap-3 border-t border-zinc-200 bg-white px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900">
 <button
 type="button"
 onClick={onCancel}
 disabled={loading}
 className="rounded-xl w-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 md:w-auto"
 >
 Cancel
 </button>

 <button
 type="submit"
 disabled={loading}
 className="rounded-xl w-full md:w-auto  dark:bg-[#B0E4CC] dark:text-black bg-[#285A48] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
 >
 {loading
 ? mode === "create"
 ? "Creating..."
 : "Updating..."
 : mode === "create"
 ? "Create Job"
 : "Update Job"}
 </button>
 </div>
 );
};

export default FormFooter