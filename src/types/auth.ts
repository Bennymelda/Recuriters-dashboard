export type UserRole =
 | "Admin"
 | "Recruiter"
 | "HR Manager"
 | "Hiring Manager";


export interface User {
 id: string;
 fullName: string;
 email: string;
  password: string;
 companyName: string;
phoneNumber?: string;
jobTitle?: string;
department?: string;
bio?: string;
location?: string;
timeZone?: string;


 role: UserRole;
 avatar?: string;
notifications: {
 interviewReminder30: boolean;
 interviewReminder5: boolean;
 jobAssigned: boolean;
 teamMemberAdded: boolean;
 teamMemberRemoved: boolean;
 roleChanged: boolean;
};


 createdAt: string;
}


export interface SignupPayload {
 fullName: string;
 email: string;
 password: string;
 companyName: string;
 role?:UserRole;
}


export interface LoginPayload {
 email: string;
 password: string;
}