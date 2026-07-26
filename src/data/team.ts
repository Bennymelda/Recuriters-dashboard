
import type { TeamMember } from "../types/team";

export const teamMembers: TeamMember[] = [
 {
 id: "team_1",
 fullName: "Sarah Johnson",
 email: "sarah.johnson@hireflow.com",
 phone: "+1 (555) 120-4567",
 avatar: "https://i.pravatar.cc/150?img=32",
 department: "Engineering",
 role: "Recruiter",
 status: "Online",
lastActive: new Date().toISOString(),


 assignedJobs: [],

 interviewsThisWeek: 15,
 hires: 18,
 averageHiringDays: 24,
assignedJobIds: ["job_1", "job_4"],
  recentActivity: [
    {
      id: "a1",
      action: "Scheduled an interview",
      recruiterName:"Sarah Johnson",
      target: "John Doe",
      date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: "a2",
      action: "Moved candidate to Offer",
      target: "Michael Brown",
      recruiterName:"Sarah Johnson",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
   
  ],

successfulHires: 18,
performanceScore: 94,


joinedAt: "2025-02-18",
 createdAt: "2026-01-08",


 },

 {
 id: "team_2",
 fullName: "Michael Brown",
 email: "michael.brown@hireflow.com",
 phone: "+1 (555) 240-8842",
 avatar: "https://i.pravatar.cc/150?img=15",
 department: "Product",
 role: "Hiring Manager",
 status: "Online",
lastActive: new Date().toISOString()

,
 assignedJobs: [],

 interviewsThisWeek: 8,
 hires: 10,
 averageHiringDays: 28,
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
successfulHires: 18,
performanceScore: 94,


joinedAt: "2025-02-18",
 createdAt: "2026-02-11",

 },

 {
 id: "team_3",
 fullName: "Grace Wilson",
 email: "grace.wilson@hireflow.com",
 phone: "+1 (555) 321-5574",
 avatar: "https://i.pravatar.cc/150?img=47",
 department: "Design",
 role: "Recruiter",
 status: "Away",
lastActive: new Date().toISOString()

,
 assignedJobs: ["job_1", "job_2", "job_4"],

 interviewsThisWeek: 12,
 hires: 13,
 averageHiringDays: 22,
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


successfulHires: 18,
performanceScore: 94,


joinedAt: "2025-02-18",
 createdAt: "2026-03-02",
 },

 {
 id: "team_4",
 fullName: "David Miller",
 email: "david.miller@hireflow.com",
 phone: "+1 (555) 775-1123",
 avatar: "https://i.pravatar.cc/150?img=12",
 department: "Marketing",
 role: "Recruiter",
 status: "Offline",
lastActive: new Date().toISOString()

,
 assignedJobs: [],
 
 interviewsThisWeek: 6,
 hires: 7,
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
 fullName: "Emma Davis",
 email: "emma.davis@hireflow.com",
 phone: "+1 (555) 811-2901",
 avatar: "https://i.pravatar.cc/150?img=25",
 department: "Human Resources",
 role: "HR Manager",
 status: "Online",
lastActive: new Date().toISOString()

,
 assignedJobs: [],

 interviewsThisWeek: 5,
 hires: 6,
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
 fullName: "James Anderson",
 email: "james.anderson@hireflow.com",
 phone: "+1 (555) 612-7833",
 avatar: "https://i.pravatar.cc/150?img=61",
 department: "Engineering",
 role: "Hiring Manager",
 status: "Away",
lastActive: new Date().toISOString()

,
successfulHires: 18,
performanceScore: 94,

assignedJobIds: ["job_1", "job_4"],
joinedAt: "2025-02-18",
 assignedJobs:["job_1", "job_2", ],

 interviewsThisWeek: 11,
 hires: 16,
 averageHiringDays: 26,

 recentActivity: [],

 createdAt: "2026-02-28",
 },

 {
 id: "team_7",
 fullName: "Olivia Martinez",
 email: "olivia.martinez@hireflow.com",
 phone: "+1 (555) 903-4488",
 avatar: "https://i.pravatar.cc/150?img=48",
 department: "Sales",
 role: "Recruiter",
 status: "Online",
assignedJobIds: ["job_1", "job_4"],
 assignedJobs: ["job_1", "job_2", "job_4"],

 interviewsThisWeek: 9,
 hires: 12,
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
    fullName: "Benny Taylor",
    email: "benny.taylor@hireflow.com",
    phone: "+1 (555) 710-0012",
    avatar: "https://i.pravatar.cc/150?img=68",
    department: "Operations",
    role: "Admin",
    status: "Online",
    lastActive: new Date().toISOString(),
    assignedJobs: ["job_2", "job_4"],
    interviewsThisWeek: 2,
    hires: 3,
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
