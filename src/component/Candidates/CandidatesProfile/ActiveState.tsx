
interface CandidateTabsProps {
 activeTab: string;
 setActiveTab: (tab: string) => void;

 application: React.ReactNode;
 interviews: React.ReactNode;
 notes: React.ReactNode;
}
const tabs = [
 {
 id: "application",
 label: "Application Details",
 },
 {
 id: "interviews",
 label: "Interview History",
 },
 {
 id: "notes",
 label: "Recruiter Notes",
 },
];

const CandidateTabs = ({
 activeTab,
 setActiveTab,
 application,
 interviews,
 notes,
}: CandidateTabsProps) => {

 return (
 <div className="mt-8 p-4 bg-white dark:bg-zinc-900">

 {/* Tabs */}
 <div className="border-b border-zinc-200 dark:border-zinc-700">
 <div className="flex items-center gap-8">

 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`
 relative
 pb-4
 pt-2

 text-sm
 font-medium

 transition-all
 duration-300

 ${
 activeTab === tab.id
 ? "text-[#408A71] dark:text-[#B0E4CC]"
 : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
 }
 `}
 >
 {tab.label}

 <span
 className={`
 absolute
 bottom-0
 left-0

 h-[3px]
 rounded-full

 bg-[#408A71]

 transition-all
 duration-300

 ${
 activeTab === tab.id
 ? "w-full opacity-100"
 : "w-0 opacity-0"
 }
 `}
 />
 </button>
 ))}

 </div>
 </div>

 {/* Content */}

 <div className="mt-8">

 {activeTab === "application" && application}

 {activeTab === "interviews" && interviews}

 {activeTab === "notes" && notes}

 </div>

 </div>
 );
};

export default CandidateTabs;