import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface PasswordFieldProps {
 label: string;
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 show: boolean;
 toggle: () => void;
}

const PasswordField = ({
 label,
 value,
 onChange,
 show,
 toggle,
}: PasswordFieldProps) => {
 return (
 <div>
 <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 {label}
 </label>

 <div className="relative">
 <input
 type={show ? "text" : "password"}
 value={value}
 onChange={onChange}
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3
 pr-12
 outline-none
 focus:border-[hashtag#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 <button
 type="button"
 onClick={toggle}
 className="
 absolute
 right-4
 top-1/2
 -translate-y-1/2
 text-zinc-500
 "
 >
 {show ? (
 <MdVisibilityOff size={20} />
 ) : (
 <MdVisibility size={20} />
 )}
 </button>
 </div>
 </div>
 );
};

export default PasswordField;