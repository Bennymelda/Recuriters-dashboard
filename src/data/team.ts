
import type { TeamMember } from "../types/team";

export const teamMembers: TeamMember[] = [
 {
 id: "team_1",
 companyId: "company_1",
 companyName: "SeamlessTechnologies",

 // Personal / Profile
 fullName: "Sarah Johnson",
 email: "sarah.johnson@hireflow.com",
 phone: "+1 (555) 120-4567",
 avatar: "https://i.pravatar.cc/150?img=32",

 // Organization
 department: "Engineering",
 role: "Recruiter",

 // Membership
 membershipStatus: "Pending",
lastActive: new Date().toISOString(),
 // Presence
 presenceStatus: "Online",


 // Job Assignments
 assignedJobIds: ["job_1", "job_4"],

 // Performance
 candidatesHandled: 42,
 interviewsThisWeek: 15,
 offersMade: 6,
 successfulHires: 18,
 averageHiringDays: 24,
 performanceScore: 94,

 // Activity
 recentActivity: [
 {
 id: "a1",
 action: "Scheduled an interview",
 recruiterName: "Sarah Johnson",
 target: "John Doe",
 date: new Date(
 Date.now() - 15 * 60 * 1000
 ).toISOString(),
 category: "interview",
 },

 {
 id: "a2",
 action: "Moved candidate to Offer",
 recruiterName: "Sarah Johnson",
 target: "Michael Brown",
 date: new Date(
 Date.now() - 2 * 60 * 60 * 1000
 ).toISOString(),
 category: "pipeline",
 },
 ],

 // Membership Dates
 joinedAt: "2025-02-18",
 createdAt: "2026-01-08",
},

 {
 id: "team_2",
 companyId: "company_1",
 companyName: "Seamless Technologies",
 fullName: "Michael Brown",
 email: "michael.brown@hireflow.com",
 phone: "+1 (555) 240-8842",
 avatar: "https://i.pravatar.cc/150?img=15",
 department: "Product",
 role: "Hiring Manager",
// Membership
 membershipStatus: "Pending",

 // Presence
 presenceStatus: "Online",
lastActive: new Date().toISOString()

,
 

 interviewsThisWeek: 8,
 candidatesHandled: 42,

 offersMade: 6,
 successfulHires: 18,
 averageHiringDays: 24,
 performanceScore: 94,

assignedJobIds: ["job_1", "job_4"],
 recentActivity: [
 {
 id: "a3",
 recruiterName:"Michael Brown",
 action: "Completed Technical interview",
 target: "Sarah Williams",
 date: "2026-07-14T11:15:00",

 },
 ],



joinedAt: "2025-02-18",
 createdAt: "2026-02-11",

 },

 {
 id: "team_3",
 companyId: "company_1",
 companyName: "SeamlessTechnologies",
 fullName: "Grace Wilson",
 email: "grace.wilson@hireflow.com",
 phone: "+1 (555) 321-5574",
 avatar: "https://i.pravatar.cc/150?img=47",
 department: "Design",
 role: "Recruiter",
 // Membership
 membershipStatus: "Pending",

 // Presence
 presenceStatus: "Online",
lastActive: new Date().toISOString()

,

 interviewsThisWeek: 12,

 averageHiringDays: 22,
candidatesHandled: 42,
 
 offersMade: 6,
 successfulHires: 18,

assignedJobIds: ["job_1", "job_4"],
 recentActivity: [
 {
 id: "a4",
 action: "Rejected candidate",
 target: "Daniel Smith",
 date: "2026-07-13T13:10:00",
 recruiterName:"Grace Wilson",
 },
 ],



performanceScore: 94,


joinedAt: "2025-02-18",
 createdAt: "2026-03-02",
 },

 {
 id: "team_4",
 companyId: "company_1",
 companyName: "Seamless Technologies",
 fullName: "David Miller",
 email: "david.miller@hireflow.com",
 phone: "+1 (555) 775-1123",
 avatar: "https://i.pravatar.cc/150?img=12",
 department: "Marketing",
 role: "Recruiter",
 // Membership
 membershipStatus: "Inactive",

 // Presence
 presenceStatus: "Offline",
lastActive: new Date().toISOString()

,

candidatesHandled: 42,
 
 offersMade: 6,
 interviewsThisWeek: 6,

 averageHiringDays: 30,
successfulHires: 18,
performanceScore: 94,

assignedJobIds: ["job_1", "job_4"],
joinedAt: "2025-02-18",
 recentActivity: [],

 createdAt: "2026-02-20",
 },

 {
 id: "team_5",
 companyId: "company_1",
 companyName: "Seamless Technologies",
 fullName: "Emma Davis",
 email: "emma.davis@hireflow.com",
 phone: "+1 (555) 811-2901",
 avatar: "https://i.pravatar.cc/150?img=25",
 department: "Human Resources",
 role: "HR Manager",
 // Membership
 membershipStatus: "Pending",

 // Presence
 presenceStatus: "Online",
lastActive: new Date().toISOString(),
 candidatesHandled: 20,
 
 offersMade: 10,
 interviewsThisWeek: 5,

 averageHiringDays: 20,
successfulHires: 18,
performanceScore: 94,

assignedJobIds: ["job_1", "job_4"],
joinedAt: "2025-02-18",
 recentActivity: [],

 createdAt: "2026-01-15",
 },

 {
 id: "team_6",
 companyId: "company_1",
 companyName: "Seamless Technologies",
 fullName: "James Anderson",
 email: "james.anderson@hireflow.com",
 phone: "+1 (555) 612-7833",
 avatar: "https://i.pravatar.cc/150?img=61",
 department: "Engineering",
 role: "Hiring Manager",
 // Membership
 membershipStatus: "Active",

 // Presence
 presenceStatus: "Away",
lastActive: new Date().toISOString()

,
successfulHires: 18,
performanceScore: 94,

assignedJobIds: ["job_1", "job_4"],
joinedAt: "2025-02-18",


 interviewsThisWeek: 11,
 candidatesHandled: 33,
 
 offersMade: 5,
 averageHiringDays: 26,

 recentActivity: [],

 createdAt: "2026-02-28",
 },

 {
 id: "team_7",
 companyId: "company_1",
 companyName: "Seamless Technologies",
 fullName: "Olivia Martinez",
 email: "olivia.martinez@hireflow.com",
 phone: "+1 (555) 903-4488",
 avatar: "https://i.pravatar.cc/150?img=48",
 department: "Sales",
 role: "Recruiter",
 
assignedJobIds: ["job_1", "job_4"],

 interviewsThisWeek: 9,
candidatesHandled: 20,
 // Membership
 membershipStatus: "Active",

 // Presence
 presenceStatus: "Online",
 offersMade: 4,
 averageHiringDays: 23,

 recentActivity: [],

 createdAt: "2026-04-04",
 successfulHires: 18,
performanceScore: 94,

lastActive: new Date().toISOString()

,
joinedAt: "2025-02-18",
 },

  {
    id: "team_8",
    companyId: "company_1",
    companyName: "Seamless Technologies",
    fullName: "Benny Taylor",
    email: "benny.taylor@hireflow.com",
    phone: "+1 (555) 710-0012",
    avatar: "https://i.pravatar.cc/150?img=68",
    department: "Operations",
    role: "Admin",
    // Membership
 membershipStatus: "Pending",

 // Presence
 presenceStatus: "Online",
    lastActive: new Date().toISOString(),
    candidatesHandled: 20,
 // Membership

 offersMade: 4,
    interviewsThisWeek: 2,
   
    averageHiringDays: 18,
    assignedJobIds: ["job_1", "job_4"],
    recentActivity: [
      {
        id: "a3",
        action: "Completed technical interview",
        target: "Jane Smith",
        recruiterName:"Benny Taylor",
        date: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      },
      {
        id: "a4",
        recruiterName:"Benny Taylor",
        action: "Rejected candidate",
        target: "David Wilson",
        date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
    successfulHires: 18,
    performanceScore: 94,
    joinedAt: "2025-02-18",
    createdAt: "2026-01-01",
  },
];
