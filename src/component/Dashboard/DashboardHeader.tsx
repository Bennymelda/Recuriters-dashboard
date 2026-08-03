import { MdAdd } from "react-icons/md";
import { useAuthStore } from "../../store/authStore";
const DashboardHeader = () => {
    const hour = new Date().getHours();
 const user = useAuthStore((state) => state.user);
    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";
/*
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
*/
    return (
 <section
 className="
 relative
 overflow-hidden
 rounded-3xl

 bg-white
 px-4 py-4

 dark:border-zinc-800
 dark:bg-zinc-900
 lg:px-4
 lg:py-4
 "
 >
 {/* Subtle decorative background */}
 <div
 className="
 pointer-events-none
 absolute
 -right-20
 -top-24
 h-64
 w-64
 rounded-full
 bg-[#285A48]/5
 blur-3xl
 dark:bg-[#B0E4CC]/5
 "
 />

 <div
 className="
 pointer-events-none
 absolute
 -bottom-32
 right-40
 h-48
 w-48
 rounded-full
 bg-[#B0E4CC]/10
 blur-3xl
 "
 />

 <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
 
 {/* Left */}
 <div className="max-w-2xl">
 

 {/* Greeting */}
 <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
 {greeting},{" "}
 <span className="text-[#285A48] dark:text-[#B0E4CC]">
 {user?.fullName}
 </span>{" "}
 👋
 </h1>

 {/* Description */}
 <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Here's a quick overview of your recruitment pipeline,
 upcoming interviews, and tasks that need your attention
 today.
 </p>
 </div>

 {/* Right */}
 <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
 
 

 {/* Create Job */}
 <button
 className="
 group
 flex
 items-center
 gap-2.5
 rounded-xl
 bg-[#285A48]
 px-5
 py-3
 text-sm
 font-semibold
 text-white
 shadow-sm
 transition-all
 duration-200
 hover:-translate-y-0.5
 hover:bg-[#1f4739]
 hover:shadow-lg
 active:translate-y-0
 dark:bg-[#B0E4CC]
 dark:text-[#285A48]
 dark:hover:bg-[#9ddbbc]
 "
 >
 <MdAdd
 size={20}
 className="transition-transform duration-200 group-hover:rotate-90"
 />

 Create Job
 </button>
 </div>
 </div>
 </section>
);
};

export default DashboardHeader;