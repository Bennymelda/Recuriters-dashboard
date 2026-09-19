import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useCandidateStore } from "../store/candidateStore";
import { useJobStore } from "../store/jobStore";
import { useAuthStore } from "../store/authStore";

const RecruiterOfferPage = () => {
  const { candidateId } = useParams<{ candidateId: string }>();

  const user = useAuthStore((state) => state.user);
  const candidates = useCandidateStore((state) => state.candidates);
  const jobs = useJobStore((state) => state.jobs);
  const navigate = useNavigate();
 const createOffer = useCandidateStore((state) => state.createOffer);
const resubmitOffer = useCandidateStore((state) => state.resubmitOffer);
  const candidate = useMemo(
    () => candidates.find((candidate) => candidate.id === candidateId),
    [candidates, candidateId]
  );

  const job = useMemo(
    () => jobs.find((job) => job.id === candidate?.jobId),
    [jobs, candidate]
  );

  const [salary, setSalary] = useState(
    candidate?.offer?.salary?.toString() || ""
  );

  const [startDate, setStartDate] = useState(
    candidate?.offer?.startDate || ""
  );

  const [employmentType, setEmploymentType] = useState(
    candidate?.offer?.employmentType || ""
  );

  const [description, setDescription] = useState(
    candidate?.offer?.description || ""
  );

  if (!candidate) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          Candidate not found
        </h1>
      </div>
    );
  }

  const hasExistingOffer = Boolean(candidate.offer);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
          {hasExistingOffer ? "Edit Offer" : "Create Offer"}
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {hasExistingOffer
            ? `Update the offer details for ${candidate.fullName}.`
            : `Enter the offer details for ${candidate.fullName}.`}
        </p>
      </div>

      {/* Candidate Information */}

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Candidate
        </h2>

        <div className="mt-4">
          <p className="font-semibold text-zinc-900 dark:text-white">
            {candidate.fullName}
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {candidate.appliedRole}
          </p>

          {job && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {job.title}
            </p>
          )}
        </div>
      </div>

      {/* Offer Details */}

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {hasExistingOffer ? "Edit Offer" : "Create Offer"}
        </h3>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Enter the offer details for this candidate.
        </p>

        {/* Company Name */}

        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Company Name
          </label>

          <input
            type="text"
            value={user?.companyName ?? ""}
            readOnly
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-600 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          />
        </div>

        {/* Offer Message */}

        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Offer Message
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="We are pleased to offer you the position of..."
            className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Salary */}

        <div className="mt-5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Salary
          </label>

          <div className="mt-2 flex items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
            <span className="px-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              ₦
            </span>

            <input
              type="text"
              value={
                salary ? Number(salary).toLocaleString("en-NG") : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");

                if (!/^\d*$/.test(value)) return;

                setSalary(value);
              }}
              placeholder="Enter salary"
              className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Start Date */}

        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Employment Type */}

        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Employment Type
          </label>

          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <option value="">Select employment type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Action Button */}

        <button
          type="button"
          disabled={
            !salary ||
            !startDate ||
            !employmentType ||
            !description.trim()
          }
          onClick={() => {
  if (hasExistingOffer) {
    resubmitOffer(
      candidate.id,
      Number(salary),
      startDate,
      employmentType,
      description
    );
  } else {
    createOffer(
      candidate.id,
      Number(salary),
      startDate,
      employmentType,
      description
    );
  }

  navigate("/recruiter");
}}
          className="mt-5 w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {hasExistingOffer ? "Resubmit Offer" : "Create Offer"}
        </button>
      </div>
    </div>
  );
};

export default RecruiterOfferPage;