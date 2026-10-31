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
 * Finds the current team member by email + companyId, with fallback to email and userId
 */
export const findCurrentMember = (
  members: TeamMember[],
  user: User | null
): TeamMember | undefined => {
  if (!user) return undefined;

  // 1. Try exact match on email + companyId
  let currentMember = members.find(
    (member) =>
      member.email?.toLowerCase() === user.email?.toLowerCase() &&
      member.companyId === user.companyId
  );

  // 2. Fallback to matching by email alone (in case companyId differs or wasn't set)
  if (!currentMember) {
    currentMember = members.find(
      (member) => member.email?.toLowerCase() === user.email?.toLowerCase()
    );
  }

  // 3. Fallback to matching by userId
  if (!currentMember && user.id) {
    currentMember = members.find(
      (member) => member.userId === user.id
    );
  }

  return currentMember;
};

/**
 * SIMPLE: Filter jobs by role ONLY
 * - Admin/Recruiter/HR Manager: All jobs (preserves dummy jobs + all created data)
 * - Hiring Manager: Assigned jobs + jobs they personally created
 */
export const getVisibleJobs = (
 jobs: Job[],
 user: User | null,
 currentMember: TeamMember | undefined
): Job[] => {
 if (!user) return [];

 // Admin, HR Manager, and Recruiter can see all jobs
 if (
   user.role === "Admin" ||
   user.role === "HR Manager" ||
   user.role === "Recruiter"
 ) {
   return jobs;
 }

 // Hiring Manager can see their assigned jobs plus any jobs they created
 if (user.role === "Hiring Manager") {
   const assignedJobIds = currentMember?.assignedJobIds ?? [];

   const visibleJobs = jobs.filter((job) =>
     assignedJobIds.includes(job.id) ||
     (job as { createdBy?: string }).createdBy === user.id ||
     (job as { createdById?: string }).createdById === user.id
   );

   return visibleJobs;
 }

 // Default fallback: return all jobs
 return jobs;
};

/**
 * SIMPLE: Filter candidates by role ONLY
 * - Admin/Recruiter/HR Manager: All candidates (preserves dummy candidates + form submissions + Firebase)
 * - Hiring Manager: Only candidates from assigned jobs
 */
export const getVisibleCandidates = (
 candidates: Candidate[],
 user: User | null,
 currentMember: TeamMember | undefined
): Candidate[] => {
 if (!user) return [];

 // Admin, HR Manager, and Recruiter can see all candidates
 if (
   user.role === "Admin" ||
   user.role === "HR Manager" ||
   user.role === "Recruiter"
 ) {
   return candidates;
 }

 // Hiring Manager can only see candidates belonging to their assigned jobs
 if (user.role === "Hiring Manager") {
   const assignedJobIds = currentMember?.assignedJobIds ?? [];

   const visibleCandidates = candidates.filter((candidate) =>
     assignedJobIds.includes(candidate.jobId)
   );

   return visibleCandidates;
 }

 return candidates;
};
