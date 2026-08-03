import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import NeedsAttention from "./NeedsAttention";
//import UpcomingInterviews from "../interviews/UpcomingInterview";
import PipelineOverview from "./PipelineOverview";
import DashboardRecentApplications from "./RecentApplication";
import RecentHiringActivity from "./RecentHiringActivity";
import DashboardUpcomingInterviews from "./UpcomingInterview";

const DashboardPage = () => {
 return (
 <div className="space-y-8">
 <DashboardHeader />

 <DashboardStats />

<div className="flex flex-row gap-4 items-start">
    
 <div className="w-full">
     <RecentHiringActivity />
 </div>

<div className="w-[40%]">
<PipelineOverview />
    </div>
 </div>

 <div className="flex flex-row gap-4 items-start">
 <div className="w-[50%]">
<NeedsAttention />
 </div>
<div className="w-[50%]">
<DashboardUpcomingInterviews  />
</div>

 </div>

 <div className="grid gap-8 xl:grid-cols-2">
 
<DashboardRecentApplications />

 
 </div>
 </div>
 );
};

export default DashboardPage; 