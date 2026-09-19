import { useMemo, useState } from "react";

import { useCandidateStore } from "../store/candidateStore";
import { useJobStore } from "../store/jobStore";
import { useAuthStore } from "../store/authStore";
import { useTeamStore } from "../store/teamStore";

import {
  findCurrentMember,
  getVisibleCandidates,
} from "../utils/roleBasedDataFiltering";
import type { Candidate } from "../types/candidate";
import RecruiterOfferModal from "./RecruiterOfferModal";
/*
const RecruiterOffers = () => {
  const user = useAuthStore((state) => state.user);
  const candidates = useCandidateStore((state) => state.candidates);
  const jobs = useJobStore((state) => state.jobs);
  const members = useTeamStore((state) => state.members);

  const currentMember = useMemo(
    () => findCurrentMember(members, user),
    [members, user]
  );
const [selectedCandidate, setSelectedCandidate] =
  useState<Candidate | null>(null);

const [openOfferModal, setOpenOfferModal] = useState(false);
  const assignedCandidates = useMemo(
    () => getVisibleCandidates(candidates, user, currentMember),
    [candidates, user, currentMember]
  );

  const offerCandidates = useMemo(() => {
    return assignedCandidates.filter(
      (candidate) =>
        candidate.status === "Interview" &&
        candidate.hiringApproval?.status === "Approved"
    );
  }, [assignedCandidates]);

  return (
<>
      <RecruiterOfferModal
  open={openOfferModal}
  candidate={selectedCandidate}
  onClose={() => {
    setOpenOfferModal(false);
    setSelectedCandidate(null);
  }}
/>
    <div className="space-y-6 p-6">
 
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
          Offers
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
          Manage candidates who are ready for an offer.
        </p>
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Candidates ready for offer
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Review and manage offers for approved candidates.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          {offerCandidates.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                No candidates are ready for an offer.
              </p>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Candidates approved by the Hiring Manager will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
                    <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      Candidate
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      Position
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {offerCandidates.map((candidate) => {
                    const job = jobs.find(
                      (job) => job.id === candidate.jobId
                    );

                    const offerStatus = candidate.offer?.status;

                    let statusLabel = "Ready";
                    let statusClass =
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

                    let actionLabel = "Create Offer";

                    if (offerStatus === "Pending HR Approval") {
                      statusLabel = "Pending HR";
                      statusClass =
                        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
                      actionLabel = "View Offer";
                    }

                    if (offerStatus === "Draft") {
                      statusLabel = "Draft";
                      statusClass =
                        "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
                      actionLabel = "Edit Offer";
                    }

                    if (offerStatus === "Approved") {
                      statusLabel = "Approved";
                      statusClass =
                        "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
                      actionLabel = "View Offer";
                    }

                    if (offerStatus === "Sent") {
                      statusLabel = "Sent";
                      statusClass =
                        "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
                      actionLabel = "View Offer";
                    }

                    if (offerStatus === "Accepted") {
                      statusLabel = "Accepted";
                      statusClass =
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
                      actionLabel = "View Offer";
                    }

                    if (offerStatus === "Declined") {
                      statusLabel = "Declined";
                      statusClass =
                        "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
                      actionLabel = "View Offer";
                    }

                    return (
                      <tr
                        key={candidate.id}
                        className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                      >
                      
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {candidate.avatar ? (
                              <img
                                src={candidate.avatar}
                                alt={candidate.fullName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                {candidate.fullName
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-zinc-900 dark:text-white">
                                {candidate.fullName}
                              </p>

                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {candidate.email}
                              </p>
                            </div>
                          </div>
                        </td>

                       
                        <td className="px-6 py-5 text-sm text-zinc-700 dark:text-zinc-300">
                          {job?.title || candidate.appliedRole}
                        </td>

                        
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                          >
                            {statusLabel}
                          </span>
                        </td>

                       
                        <td className="px-6 py-5">
                          <button

                            type="button"
                             onClick={() => {
                                setSelectedCandidate(candidate);
                                setOpenOfferModal(true);
                            }}
                            className="rounded-xl bg-[#408A71] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            {actionLabel}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

    
    </div>
    </> 
  );
 
};

export default RecruiterOffers;
*/



const RecruiterOffers = () => {
  const user = useAuthStore((state) => state.user);
  const candidates = useCandidateStore((state) => state.candidates);
  const jobs = useJobStore((state) => state.jobs);
  const members = useTeamStore((state) => state.members);

  const currentMember = useMemo(
    () => findCurrentMember(members, user),
    [members, user]
  );

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [openOfferModal, setOpenOfferModal] = useState(false);

  const assignedCandidates = useMemo(
    () => getVisibleCandidates(candidates, user, currentMember),
    [candidates, user, currentMember]
  );

  /*
   * Only candidates who have reached the Offer stage
   * should appear on this page.
   *
   * The offer itself is created before the candidate
   * enters this stage.
   */
  const offerCandidates = useMemo(() => {
    return assignedCandidates.filter(
      (candidate) => candidate.status === "Offer"
    );
  }, [assignedCandidates]);

  const getOfferStatus = (candidate: Candidate) => {
    const offerStatus = candidate.offer?.status;

    switch (offerStatus) {
      case "Draft":
        return {
          label: "Draft",
          className:
            "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        };

      case "Pending HR Approval":
        return {
          label: "Pending Approval",
          className:
            "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
        };

      case "Approved":
        return {
          label: "Approved",
          className:
            "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
        };

      case "Rejected":
        return {
          label: "Rejected",
          className:
            "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
        };

      case "Sent":
        return {
          label: "Sent",
          className:
            "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
        };

      case "Accepted":
        return {
          label: "Accepted",
          className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        };

      case "Declined":
        return {
          label: "Declined",
          className:
            "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
        };

      default:
        return {
          label: "No Offer",
          className:
            "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
        };
    }
  };

  const getActionLabel = (candidate: Candidate) => {
    switch (candidate.offer?.status) {
      case "Rejected":
        return "Edit Offer";

      case "Draft":
        return "Edit Offer";

      case "Pending HR Approval":
      case "Approved":
      case "Sent":
      case "Accepted":
      case "Declined":
        return "View Offer";

      default:
        return "View Offer";
    }
  };

  return (
    <>
      <RecruiterOfferModal
        open={openOfferModal}
        candidate={selectedCandidate}
        onClose={() => {
          setOpenOfferModal(false);
          setSelectedCandidate(null);
        }}
      />

      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
            Offers
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
            Track and manage offers for candidates who have reached the offer
            stage.
          </p>
        </div>

        {/* Offer Table */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Offer Management
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Review offer status, details, and candidate responses.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {offerCandidates.length === 0 ? (
              <div className="p-10 text-center">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  No candidates are currently in the offer stage.
                </p>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Candidates will appear here once they reach the Offer stage.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
                      {/* Candidate */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Candidate
                      </th>

                      {/* Position */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Position
                      </th>

                      {/* Recruiter */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Recruiter
                      </th>

                      {/* Salary */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Salary
                      </th>

                      {/* Sent Date */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Sent Date
                      </th>

                      {/* Status */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Status
                      </th>

                      {/* Actions */}
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {offerCandidates.map((candidate) => {
                      const job = jobs.find(
                        (job) => job.id === candidate.jobId
                      );

                      const offerStatus = getOfferStatus(candidate);
                      const actionLabel = getActionLabel(candidate);

                      return (
                        <tr
                          key={candidate.id}
                          className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                        >
                          {/* Candidate */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar}
                                  alt={candidate.fullName}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                  {candidate.fullName
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>
                              )}

                              <div>
                                <p className="font-semibold text-zinc-900 dark:text-white">
                                  {candidate.fullName}
                                </p>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                  {candidate.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Position */}
                          <td className="px-6 py-5 text-sm text-zinc-700 dark:text-zinc-300">
                            {job?.title || candidate.appliedRole}
                          </td>

                          {/* Recruiter */}
                          <td className="px-6 py-5 text-sm text-zinc-700 dark:text-zinc-300">
                            {candidate.offer?.createdByName || "—"}
                          </td>

                          {/* Salary */}
                          <td className="px-6 py-5 text-sm font-medium text-zinc-900 dark:text-white">
                            {candidate.offer?.salary
                              ? `₦${candidate.offer.salary.toLocaleString()}`
                              : "—"}
                          </td>

                          {/* Sent Date */}
                          <td className="px-6 py-5 text-sm text-zinc-700 dark:text-zinc-300">
                            {candidate.offer?.sentAt
                              ? new Date(
                                  candidate.offer.sentAt
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—"}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${offerStatus.className}`}
                            >
                              {offerStatus.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCandidate(candidate);
                                setOpenOfferModal(true);
                              }}
                              className="rounded-xl bg-[#408A71] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                              {actionLabel}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default RecruiterOffers;