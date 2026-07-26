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

 <div className="grid gap-8 xl:grid-cols-3">
 <div className="xl:col-span-2">
 <NeedsAttention />
 </div>

 <div>
 <DashboardUpcomingInterviews  />
 </div>
 </div>

 <PipelineOverview />

 <div className="grid gap-8 xl:grid-cols-2">
 <DashboardRecentApplications />

 <RecentHiringActivity />
 </div>
 </div>
 );
};

export default DashboardPage; 