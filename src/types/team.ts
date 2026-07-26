export type TeamRole =
 | "Admin"
 | "Recruiter"
 | "Hiring Manager"
 | "HR Manager";


export type TeamStatus =
 | "Online"
 | "Away"
 | "Offline";

export interface TeamActivity {
 id: string;
 recruiterName: string;
 action: string;
 target: string;
 secondaryTarget?: string;
 date: string;
 category?: "interview" | "pipeline" | "job" | "team" | "candidate";
}
export interface TeamMember {
 id: string;

 // Personal Info
 fullName: string;
 avatar?: string;
 email: string;
 phone: string;

 role: TeamRole | "";

 department:
 | "Engineering"
 | "Design"
 | "Marketing"
 | "Human Resources"
 | "Product"
 | "Sales"
 | "Operations"
 | "";


 // Status
 status: TeamStatus;

 // Performance

 assignedJobs: string[];
assignedJobIds: string[];
//activeCandidates: number;
 interviewsThisWeek: number;
 hires: number;
 averageHiringDays: number;


 successfulHires: number;
performanceScore: number;

 // Activity
 recentActivity: TeamActivity[];
lastActive: string;
 createdAt: string;
 joinedAt?: string;
}