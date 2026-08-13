//import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import NeedsAttention from "./NeedsAttention";
import PipelineOverview from "./PipelineOverview";
import DashboardRecentApplications from "./RecentApplication";
import RecentHiringActivity from "./RecentHiringActivity";
import DashboardUpcomingInterviews from "./UpcomingInterview";





const DashboardPage = () => {
 return (
 <div className="w-full space-y-6 overflow-hidden sm:space-y-8">

 {/* Stats */}
 <DashboardStats />

 {/* Hiring Activity + Pipeline */}
 <div
 className="
 grid
 grid-cols-1
 items-stretch
 gap-6
 lg:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 "
 >
 <div className="min-w-0 h-full">
 <div className="h-full">
 <RecentHiringActivity />
 </div>
 </div>

 <div className="min-w-0 h-full">
 <div className="h-full">
 <PipelineOverview />
 </div>
 </div>
 </div>

 {/* Needs Attention + Upcoming Interviews */}
 <div
 className="
 grid
 grid-cols-1
 items-stretch
 gap-6
 lg:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 "
 >
 <div className="min-w-0 h-full">
 <div className="h-full">
 <NeedsAttention />
 </div>
 </div>

 <div className="min-w-0 h-full">
 <div className="h-full">
 <DashboardUpcomingInterviews />
 </div>
 </div>
 </div>

 {/* Recent Applications */}
 <div className="w-full min-w-0">
 <DashboardRecentApplications />
 </div>

 </div>
 );
};

export default DashboardPage;