
import TeamMemberHeader from "./TeamprofileHeader";
import TeamMemberStats from "./TeamMemberStats";
import TeamMemberInfo from "./TeamMemberInfo";
import TeamAssignedJobs from "./TeamAssignedJobs";
import TeamRecentActivity from "./TeamRecentActivity";
import TeamPerformance from "./TeamPerformance";
import TeamInterviewSchedule from "./TeamInterview";
const TeamMemberProfilePage = () => {
 return (
 <section className="space-y-8 ">
<TeamMemberStats />

<div className="bg-white dark:bg-zinc-900 p-4 space-y-4 rounded-2xl">


 <TeamMemberHeader />

 

 <div className="grid gap-8 xl:grid-cols-3">

 <div className="space-y-8 xl:col-span-2">

 <TeamMemberInfo />

 <TeamAssignedJobs />

 <TeamRecentActivity />

 </div>

 <div className="space-y-8">

 <TeamPerformance />

 <TeamInterviewSchedule />

 </div>

 </div>
 </div>

 </section>
 );
};

export default TeamMemberProfilePage;