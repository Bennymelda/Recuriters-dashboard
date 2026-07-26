import InterviewsHeader from "./InterviewsHeader";
import InterviewsStats from "./InterviewStats";
import InterviewsTable from "./InterviewsTable";
import InterviewsToolbar from "./InterviewToolbar";
import { useState } from "react";
import TodaysInterviews from "./TodayInterviews";
import { useCandidateStore } from "../../store/candidateStore";
//import type { Candidate, InterviewHistoryItem } from "../../types/candidate";

import UpcomingInterviews from "./UpcomingInterview";
import InterviewCalendar from "./InterviewCalender";
import NoFilterResults from "./NoFilterResults";

const InterviewsPage = () => {
     const [stage, setStage] = useState("");

 const [interviewer, setInterviewer] = useState("");

 const candidates = useCandidateStore((state) => state.candidates);

const filteredInterviews = candidates.flatMap((candidate) =>
 candidate.interviewHistory
 .filter((interview) => {
 if (interview.result !== "Scheduled") return false;

 if (stage && interview.stage !== stage) return false;

 if (
 interviewer &&
 interview.interviewerName !== interviewer
 )
 return false;

 return true;
 })
 .map((interview) => ({
 candidate,
 interview,
 }))
);

const hasInterviews = candidates.some((candidate) =>
 candidate.interviewHistory.some(
 (interview) =>
 interview.result === "Scheduled" ||
 interview.result === "Passed" ||
 interview.result === "Failed"
 )
);

const noFilterResults =
 hasInterviews && filteredInterviews.length === 0;

const today = new Date().toDateString();


/*
const todaysInterviews: {
 candidate: Candidate;
 interview: InterviewHistoryItem;
}[] = candidates.flatMap((candidate) =>
 candidate.interviewHistory
 .filter(
 (interview) =>
 interview.result === "Scheduled" &&
 new Date(interview.date).toDateString() === today
 )
 .map((interview) => ({
 candidate,
 interview,
 }))
);


const upcomingInterviews: {
 candidate: Candidate;
 interview: InterviewHistoryItem;
}[] = candidates
 .flatMap((candidate) =>
 candidate.interviewHistory
 .filter(
 (interview) =>
 interview.result === "Scheduled" &&
 new Date(interview.date) > new Date()
 )
 .map((interview) => ({
 candidate,
 interview,
 }))
 )
 .sort(
 (a, b) =>
 new Date(a.interview.date).getTime() -
 new Date(b.interview.date).getTime()
 );
*/


const todaysInterviews = filteredInterviews.filter(
 ({ interview }) =>
 new Date(interview.date).toDateString() === today
);

const upcomingInterviews = filteredInterviews
 .filter(
 ({ interview }) =>
 new Date(interview.date) > new Date()
 )
 .sort(
 (a, b) =>
 new Date(a.interview.date).getTime() -
 new Date(b.interview.date).getTime()
 );
 return (
 <section className="space-y-8">
 <InterviewsHeader />

 <InterviewsStats />

 <InterviewsToolbar
 stage={stage}
 setStage={setStage}
 
 interviewer={interviewer}
 setInterviewer={setInterviewer}
 />

 <div className="flex flex-col xl:flex-row xl:justify-between items-start gap-6 ">
 
 <InterviewCalendar />

{noFilterResults ? (
 <NoFilterResults
 onClearFilters={() => {
 setStage("");
 setInterviewer("");
 }}
 />
) : (
 <>
 <UpcomingInterviews
 interviews={upcomingInterviews}
 />
</>
)}
 </div>

 {noFilterResults ? (
 <NoFilterResults
 onClearFilters={() => {
 setStage("");
 setInterviewer("");
 }}
 />
) : (
 <>

 <TodaysInterviews interviews={todaysInterviews} />
 <InterviewsTable interviews={filteredInterviews} />
 </>
)}
 </section>
);
};

export default InterviewsPage;