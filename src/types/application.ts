export interface Application {
 id: string;

 jobId: string;
 candidateId: string;

 status:
 | "Applied"
 | "Screening"
 | "Interview"
 | "Offer"
 | "Hired"
 | "Rejected";

 matchScore: number; // UI-only (0–100)

 appliedAt: string;
 updatedAt: string;
}