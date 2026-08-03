//import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import NeedsAttention from "./NeedsAttention";
import PipelineOverview from "./PipelineOverview";
import DashboardRecentApplications from "./RecentApplication";
import RecentHiringActivity from "./RecentHiringActivity";
import DashboardUpcomingInterviews from "./UpcomingInterview";

const DashboardPage = () => {
 return (
 <div className="w-full space-y-8 overflow-hidden">
 

 {/* Stats */}
 <DashboardStats />

 {/* Hiring Activity + Pipeline */}
 <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
 <div className="min-w-0">
 <RecentHiringActivity />
 </div>

 <div className="min-w-0">
 <PipelineOverview />
 </div>
 </div>



 <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
 <div className="min-w-0">
 <NeedsAttention />
 </div>

 <div className="min-w-0">
 <DashboardUpcomingInterviews />
 </div>
 </div>



 <div className="w-full min-w-0">
 
 
 <DashboardRecentApplications />
 </div>


 {/* Recent Applications */}

 </div>
 );
};

export default DashboardPage; 