import { useNavigate, useParams } from "react-router-dom";
//import { useJobStore } from "../../../store/jobStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import type {Job} from "../../../types/job";
import { useEffect, useState } from "react";
const JobApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
 const loadJob = async () => {
 if (!jobId) {
 setLoading(false);
 return;
 }

 try {
 const jobRef = doc(db, "jobs", jobId);
 const jobSnapshot = await getDoc(jobRef);

 if (jobSnapshot.exists()) {
 setJob(jobSnapshot.data() as Job);
 } else {
 setJob(null);
 }
 } catch (error) {
 console.error("Failed to load job:", error);
 setJob(null);
 } finally {
 setLoading(false);
 }
 };

 loadJob();
}, [jobId]);


if (loading) {
 return (
 <div className="flex min-h-screen items-center justify-center">
 <p>Loading job...</p>
 </div>
 );
}

  if (!job) {
    return (
      <div>
        <h1>Job Not Found</h1>
        <p>This job may no longer be available.</p>
      </div>
    );
  }

  const handleApply = () => {
    navigate(`/jobs/${jobId}/apply`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {job.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.employmentType}</span>
            <span>•</span>
            <span>{job.experienceLevel}</span>
          </div>

          {job.salary && (
            <p className="mt-4 font-medium text-zinc-700 dark:text-zinc-300">
              {job.salary}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-8 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            About the Role
          </h2>

          <p className="mt-4 whitespace-pre-line text-zinc-600 dark:text-zinc-400">
            {job.description}
          </p>

          {job.responsibilities.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Responsibilities
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Requirements
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Benefits
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.skills.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <button
              onClick={handleApply}
              className="rounded-xl bg-[#285A48] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;