//import DashboardHeader from "./DashboardHeader";
import { useAuthStore } from "../../store/authStore";
import DashboardStats from "./DashboardStats";
import NeedsAttention from "./NeedsAttention";
import OfferApprovalRequests from "./OfferApproval";
import PipelineOverview from "./PipelineOverview";
import DashboardRecentApplications from "./RecentApplication";
import RecentHiringActivity from "./RecentHiringActivity";
import DashboardUpcomingInterviews from "./UpcomingInterview";





const DashboardPage = () => {
    const user = useAuthStore((state) => state.user);
 return (
 <div className="w-full space-y-6 overflow-hidden sm:space-y-8">

 {/* Stats */}
 <DashboardStats />

 {/* Hiring Activity + Pipeline */}
 <div
 className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 items-stretch
"
>
 <RecentHiringActivity />
 <PipelineOverview />
</div>
<div className="w-full min-w-0">
{user?.role === "HR Manager" && <OfferApprovalRequests />}
</div>
 {/* Needs Attention + Upcoming Interviews */}
 <div
 className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 items-stretch
"
>
 <NeedsAttention />
 <DashboardUpcomingInterviews />
</div>

 {/* Recent Applications */}
 <div className="w-full min-w-0">
 <DashboardRecentApplications />
 </div>

 </div>
 );
};

export default DashboardPage;