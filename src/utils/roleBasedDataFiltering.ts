import type { User } from "../types/auth";
import type { TeamMember } from "../types/team";
import type { Job } from "../types/job";
import type { Candidate } from "../types/candidate";

/**
 * SIMPLE role-based filtering - PRESERVES all existing data
 * - Admin/Recruiter/HR Manager: See ALL jobs (including dummy jobs)
 * - Hiring Manager: See ONLY jobs assigned to them
 * 
 * NO company filtering - all existing data is preserved
 */

/**
 * Finds the current team member by email + companyId
 */
export const findCurrentMember = (
  members: TeamMember[],
  user: User | null
): TeamMember | undefined => {
  if (!user) return undefined;

  const currentMember = members.find(
    (member) =>
      member.email.toLowerCase() === user.email.toLowerCase() &&
      member.companyId === user.companyId
  );


  return currentMember;
};

/**
 * SIMPLE: Filter jobs by role ONLY
 * - Admin/Recruiter/HR Manager: All jobs (preserves dummy jobs + all data)
 * - Hiring Manager: Only assigned jobs
 * 
 * NO company filtering - preserves all dummy jobs
 */
export const getVisibleJobs = (
 jobs: Job[],
 user: User | null,
 currentMember: TeamMember | undefined
): Job[] => {
 if (!user) return [];

 // Admin and HR Manager can see all jobs
 if (user.role === "Admin" || user.role === "HR Manager") {
 return jobs;
 }

 // Recruiter and Hiring Manager can only see their assigned jobs
 if (user.role === "Recruiter" || user.role === "Hiring Manager") {
 if (!currentMember) {

 return [];
 }

 const assignedJobIds = currentMember.assignedJobIds ?? [];

 const visibleJobs = jobs.filter((job) =>
 assignedJobIds.includes(job.id)
 );

 
 return visibleJobs;
 }

 return [];
};

/**
 * SIMPLE: Filter candidates by role ONLY
 * - Admin/Recruiter/HR Manager: All candidates (preserves dummy candidates + form submissions + Firebase)
 * - Hiring Manager: Only candidates from assigned jobs
 * 
 * NO company filtering - preserves all existing candidate data
 */
export const getVisibleCandidates = (
 candidates: Candidate[],
 user: User | null,
 currentMember: TeamMember | undefined
): Candidate[] => {
 if (!user) return [];

 // Admin and HR Manager can see all candidates
 if (user.role === "Admin" || user.role === "HR Manager") {
 return candidates;
 }

 // Recruiter and Hiring Manager can only see
 // candidates belonging to their assigned jobs
 if (user.role === "Recruiter" || user.role === "Hiring Manager") {
 if (!currentMember) {

 return [];
 }

 const assignedJobIds = currentMember.assignedJobIds ?? [];

 const visibleCandidates = candidates.filter((candidate) =>
 assignedJobIds.includes(candidate.jobId)
 );

 
 return visibleCandidates;
 }

 return [];
};
