import type { TeamRole } from "./team";


export interface InterviewHistoryItem {
 id: string;
 stage: "Screening" | "Technical" | "HR" | "Final";
 interviewerId: string;
interviewerName: string;
 date: string;
 result: "Scheduled" | "Passed" | "Failed" | "Pending" | "Cancelled";
 note: string;
 feedback: string;
}

export interface Candidate {
 id: string;
assignedRecruiterId?: string;
assignedRecruiterName?: string;
 // Personal Information
 fullName: string;
 hiredAt?: string;
 avatar?: string;
jobId: string;
 email: string;
 phone: string;
 location: string;
department:
 | "Engineering"
 | "Design"
 | "Marketing"
 | "Human Resources";
 // Job Information
 appliedRole: string;

 status:
 | "Applied"
 | "Screening"
 | "Interview"
 | "Offer"
 | "Hired"
 | "Rejected"
 | "Offer Declined";


hiringApproval?: {
 status: "Pending" | "Approved" | "Rejected";
 requestedBy: string;
 requestedByName: string;
 reviewedBy?: string;
 reviewedByName?: string;
 reviewedAt?: string;
 note?: string;
};
offer?: {
    id:string;
 status:
 | "Draft"
 | "Pending HR Approval"
 | "Approved"
 | "Sent"
 | "Accepted"
 | "Declined";

 salary?: number;
 startDate?: string;
 employmentType?: string;
  description?:string;
  companyName?:string;
 createdBy?: string;
 createdByName?: string;

 approvedBy?: string;
 approvedByName?: string;
 approvedAt?: string;

 sentAt?: string;
 respondedAt?: string;
};
hiredBy?: string;
hiredByName?: string;


 experience: "Junior" | "Mid" | "Senior";
readyForOffer?: boolean;
 // Professional Information
 bio: string;

 skills: string[];

 education: string;

 yearsOfExperience: number;

 // Resume & Links
 resumeUrl?: string;

 github?: string;

 linkedin?: string;

 portfolio?: string;

 // Interview History
 interviewHistory: InterviewHistoryItem[];


 rejection?: {
 reason: string;
 note: string;
 date: string;
};
 // Recruiter Notes
 notes: {
 id: string;
 author: string;
 authorId: string;
 date: string;
 authorRole:TeamRole;
 content: string;
 }[];

source:
 | "LinkedIn"
 | "Indeed"
 | "Referral"
 | "Company Website"
 | "Job Board"
 | "Glassdoor"
 | "Twitter"
 | "University"
 | "Employee Referral"
 | "Other";

stageUpdatedAt: string;
 // Metadata
 createdAt: string;
 updatedAt: string;
}

export type InterviewStage =
 | "Screening"
 | "Technical"
 | "HR"
 | "Final";