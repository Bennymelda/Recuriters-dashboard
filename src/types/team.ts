

export type TeamRole =
 | "Admin"
 | "Recruiter"
 | "Hiring Manager"
 | "HR Manager";

export type TeamMembershipStatus =
 | "Pending"
 | "Active"
 | "Inactive";

export type TeamPresenceStatus =
 | "Online"
 | "Away"
 | "Offline";

export type TeamDepartment =
 | "Engineering"
 | "Design"
 | "Marketing"
 | "Human Resources"
 | "Product"
 | "Sales"
 | "Operations"
 | "";

export type TeamActivityCategory =
 | "interview"
 | "pipeline"
 | "job"
 | "team"
 | "candidate";

export interface TeamActivity {
 id: string;

 recruiterName: string;

 action: string;

 target: string;

 secondaryTarget?: string;

 date: string;

 category?: TeamActivityCategory;
}

export interface TeamInvitation {
 id: string;

 companyId: string;

 fullName: string;

 email: string;

 role: TeamRole;

 status: "Pending" | "Accepted" | "Expired";
companyName:string;
 invitedAt: string;

 acceptedAt?: string;
}

export interface TeamMember {
 id: string;
 companyId: string;
 invitationId?:string
userId?: string;
 // --------------------------------
 // Personal / Profile Information
 // --------------------------------

 fullName: string;

 email: string;

 phone?: string;

 avatar?: string;

 // --------------------------------
 // Organization
 // --------------------------------

 role: TeamRole | "";

 department: TeamDepartment;


companyName: string;

 // --------------------------------
 // Membership
 // --------------------------------

 membershipStatus: TeamMembershipStatus;

 // --------------------------------
 // Presence
 // --------------------------------

 presenceStatus: TeamPresenceStatus;

 lastActive?: string;

 // --------------------------------
 // Job Assignments
 // --------------------------------

 assignedJobIds: string[];

 // --------------------------------
 // Performance
 // --------------------------------

 candidatesHandled: number;

 interviewsThisWeek: number;

 offersMade: number;

 successfulHires: number;

 averageHiringDays: number;

 performanceScore: number;

 // --------------------------------
 // Activity
 // --------------------------------

 recentActivity: TeamActivity[];

 // --------------------------------
 // Invitation
 // --------------------------------

 invitedAt?: string;

 // --------------------------------
 // Membership Dates
 // --------------------------------

 joinedAt?: string;

 createdAt: string;
}



