import { MdAdd } from "react-icons/md";

const DashboardHeader = () => {
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#285A48] dark:text-[#B0E4CC]">
                    Recruiter Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                    {greeting} 👋
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    Welcome back. Here's a quick overview of your recruitment pipeline,
                    upcoming interviews, and tasks that need your attention today.
                </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {today}
                </p>

                <button
                    className="
 flex items-center gap-2
 rounded-2xl
 bg-[#285A48]
 px-5 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#1f4739]

 dark:bg-[#B0E4CC]
 dark:text-[#285A48]
 dark:hover:bg-[#9ddbbc]
 "
                >
                    <MdAdd size={22} />
                    Create Job
                </button>
            </div>
        </section>
    );
};

export default DashboardHeader;