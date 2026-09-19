import { useState } from "react";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore";
import type { Candidate } from "../types/candidate";

interface RecruiterOfferModalProps {
  open: boolean;
  candidate: Candidate | null;
  onClose: () => void;
}

const RecruiterOfferModal = ({
  open,
  candidate,
  onClose,
}: RecruiterOfferModalProps) => {
  const user = useAuthStore((state) => state.user);

  const createOffer = useCandidateStore(
    (state) => state.createOffer
  );

  const resubmitOffer = useCandidateStore(
    (state) => state.resubmitOffer
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

  if (!open || !candidate) return null;

  const hasExistingOffer = Boolean(candidate.offer);

  const handleSubmit = () => {
    if (
      !salary ||
      !startDate ||
      !employmentType ||
      !description.trim()
    ) {
      return;
    }

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

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {hasExistingOffer ? "Edit Offer" : "Create Offer"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {hasExistingOffer
                ? `Update the offer details for ${candidate.fullName}.`
                : `Enter the offer details for ${candidate.fullName}.`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-zinc-400 transition hover:text-zinc-700 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Candidate */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="font-semibold text-zinc-900 dark:text-white">
            {candidate.fullName}
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {candidate.appliedRole}
          </p>
        </div>

        {/* Offer form */}
        <div className="mt-6 space-y-4">

          {/* Company */}
          <div>
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

          {/* Message */}
          <div>
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
          <div>
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Salary
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
              <span className="px-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                ₦
              </span>

              <input
                type="text"
                value={
                  salary
                    ? Number(salary).toLocaleString("en-NG")
                    : ""
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
          <div>
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

          {/* Employment */}
          <div>
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Employment Type
            </label>

            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            >
              <option value="">Select employment type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-zinc-200 px-6 py-3 font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              !salary ||
              !startDate ||
              !employmentType ||
              !description.trim()
            }
            onClick={handleSubmit}
            className="flex-1 rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasExistingOffer ? "Resubmit Offer" : "Create Offer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterOfferModal;