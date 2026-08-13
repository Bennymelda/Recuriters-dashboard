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

<div className="grid grid-cols-2">
 
 <HiringActivityChart />
 <RecruitmentFunnel />
</div>

<div className="grid grid-cols-2">

 <TimeToHire />
  <HiringSources />
</div>
 


 <JobsPerformance />


 </main>
 );
};

export default AnalyticsPage;