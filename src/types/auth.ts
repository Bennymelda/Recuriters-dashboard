export type UserRole =
 | "Admin"
 | "Recruiter"
 | "HR Manager"
 | "Hiring Manager";

export interface User {
 id: string;

 // Company the user belongs to
 companyId: string;
 companyName: string;

 // Personal information
 fullName: string;
 email: string;
 password: string;

 phoneNumber?: string;
 jobTitle?: string;
 department?: string;
 bio?: string;
 location?: string;
 timeZone?: string;

 // Access
 role: UserRole;

 // Profile
 avatar?: string;

 // Notification preferences
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

 /*
 * Company information is optional because
 * an invited team member already belongs
 * to an existing company.
 */
 companyId?: string;
 companyName?: string;

 /*
 * The Admin's role is Admin by default.
 * An invited member gets their role from
 * the invitation.
 */
 role?: UserRole;

 /*
 * Used later when we build the invitation flow.
 */
 invitationId?: string;
}

export interface LoginPayload {
 email: string;
 password: string;
}