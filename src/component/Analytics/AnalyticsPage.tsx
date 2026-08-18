import AnalyticsHeader from "./componenet/AnalyticsHeader";
import AnalyticsStats from "./componenet/AnalyticsStats";
import HiringActivityChart from "./componenet/HiringActivityChart";
import RecruitmentFunnel from "./componenet/RecuritmentFunnel";
import TimeToHire from "./componenet/TimetoHire";
import JobsPerformance from "./componenet/JobsPerformance";
import HiringSources from "./componenet/HiringSourceChart";
const AnalyticsPage = () => {
 return (
 <main className="space-y-6">
 <AnalyticsHeader />
<AnalyticsStats />

<div className="
 grid
 grid-cols-1
 items-stretch
 gap-6
 xl:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 ">
 
 <HiringActivityChart />
 <RecruitmentFunnel />
</div>

<div className="grid gid-cols-1 lg:grid-cols-2 gap-5">

 <TimeToHire />
  <HiringSources />
</div>
 


 <JobsPerformance />


 </main>
 );
};

export default AnalyticsPage;