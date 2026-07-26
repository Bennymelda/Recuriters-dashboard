import { useRef } from "react";
import { MdPhotoCamera, MdDelete } from "react-icons/md";

interface TeamAvatarUploadProps {
 image: File | null;
 preview: string | null;
 setImage: (file: File | null) => void;
 setPreview: (preview: string | null) => void;
}

const TeamAvatarUpload = ({
 image,
 preview,
 setImage,
 setPreview,
}: TeamAvatarUploadProps) => {
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleSelectImage = (
 e: React.ChangeEvent<HTMLInputElement>
 ) => {
 const file = e.target.files?.[0];

 if (!file) return;

 setImage(file);

 setPreview(URL.createObjectURL(file));
 };

 const removeImage = () => {
 setImage(null);
 setPreview(null);

 if (fileInputRef.current) {
 fileInputRef.current.value = "";
 }
 };

 return (
 <section>
 <h3 className="mb-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Profile Photo
 </h3>

 <div className="flex items-center gap-6">
 <input
 ref={fileInputRef}
 hidden
 type="file"
 accept="image/*"
 onChange={handleSelectImage}
 />

 {/* Clickable Avatar */}
 <div
 onClick={() => fileInputRef.current?.click()}
 className="group relative cursor-pointer"
 >
 <img
 src={
 preview ??
 "https://ui-avatars.com/api/?name=Team+Member&background=EEF8F3&color=408A71"
 }
 alt="Preview"
 className="
 h-24
 w-24
 rounded-3xl
 border-2
 border-[#285A48]
 object-cover
 transition
 duration-300
 group-hover:brightness-75
 dark:border-[#B0E4CC]
 "
 />

 {/* Camera Badge */}
 <div
 className="
 absolute
 bottom-0
 right-0

 flex
 h-9
 w-9
 items-center
 justify-center

 rounded-full

 border-2
 border-white

 bg-[#285A48]

 text-white

 shadow-lg

 transition
 duration-300

 group-hover:scale-110

 dark:border-zinc-900
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 "
 >
 <MdPhotoCamera size={18} />
 </div>

 {/* Hover Overlay */}
 <div
 className="
 absolute
 inset-0

 flex
 items-center
 justify-center

 rounded-3xl

 bg-black/40

 opacity-0

 transition
 duration-300

 group-hover:opacity-100
 "
 >
 <span className="text-xs font-medium text-white">
 Change Photo
 </span>
 </div>
 </div>

 {/* Helper Text */}
 <div className="space-y-2">
 

 {image && (
 <button
 type="button"
 onClick={removeImage}
 className="
 text-sm
 font-medium
 text-red-600
 transition
 bg-red-300
 rounded-full
 p-2
 hover:underline
 "
 >
<MdDelete size={20}/>
 </button>
 )}
 </div>
</div>
 </section>
 );
};

export default TeamAvatarUpload;