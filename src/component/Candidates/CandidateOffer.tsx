import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import type { Candidate } from "../../types/candidate";
import { useCandidateStore } from "../../store/candidateStore";

const CandidateOffer = () => {
  const { offerId } = useParams<{ offerId: string }>();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const acceptOffer = useCandidateStore((state) => state.acceptOffer);
  const declineOffer = useCandidateStore((state) => state.declineOffer);

  useEffect(() => {
    const fetchOffer = async () => {
  if (!offerId) {
    setIsLoading(false);
    return;
  }

  try {
    const candidatesQuery = query(
      collection(db, "candidates"),
      where("offer.id", "==", offerId)
    );

    const snapshot = await getDocs(candidatesQuery);

    if (!snapshot.empty) {
      const candidateDoc = snapshot.docs[0];

      setCandidate({
        ...(candidateDoc.data() as Candidate),
        id: candidateDoc.id,
      });
    }
  } catch (error) {
    console.error("Failed to fetch offer:", error);
  } finally {
    setIsLoading(false);
  }
};

    fetchOffer();
  }, [offerId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-5 dark:bg-zinc-950">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Loading offer...
          </p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-5 dark:bg-zinc-950">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Offer Not Found
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            This offer could not be found or may no longer be available.
          </p>
        </div>
      </div>
    );
  }

  const offer = candidate.offer!;

 return (
  <div className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-950">
    <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-xl dark:bg-zinc-900">

      {/* Company Header */}
      <div className="border-b border-zinc-200 px-6 py-8 sm:px-10 dark:border-zinc-700">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {offer.companyName || "Company Name"}
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Employment Offer
            </p>
          </div>

          <div className="rounded-full bg-[#408A71]/10 px-4 py-2 text-sm font-semibold text-[#408A71]">
            Job Offer
          </div>
        </div>
      </div>

      {/* Offer Letter */}
      <div className="px-6 py-8 sm:px-10 sm:py-10">

        {/* Date */}
        <div className="mb-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Date
          </p>

          <p className="mt-1 font-medium text-zinc-900 dark:text-white">
            {offer.sentAt
              ? new Date(offer.sentAt).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : new Date().toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </p>
        </div>

        {/* Candidate */}
        <div>
          <p className="text-lg font-semibold text-zinc-900 dark:text-white">
            Dear {candidate.fullName},
          </p>

          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            <p>
              We are pleased to formally offer you employment with{" "}
              <strong className="text-zinc-900 dark:text-white">
                {offer.companyName || "our company"}
              </strong>{" "}
              for the position of{" "}
              <strong className="text-zinc-900 dark:text-white">
                {candidate.appliedRole}
              </strong>
              .
            </p>

            <p>
              Following the completion of our recruitment and interview
              process, we were impressed by your qualifications, experience,
              and skills. We believe you would be a valuable addition to our
              team and are excited about the opportunity to have you join us.
            </p>

            <p>
              The details of your offer are outlined below.
            </p>
          </div>
        </div>

        {/* Position Details */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6 dark:border-zinc-700 dark:bg-zinc-800/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Position Details
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Position
              </p>

              <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                {candidate.appliedRole}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Employment Type
              </p>

              <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                {offer.employmentType || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Start Date
              </p>

              <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                {offer.startDate
                  ? new Date(`${offer.startDate}T00:00:00`).toLocaleDateString(
                      "en-NG",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Compensation
              </p>

              <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                {offer.salary
                  ? `₦${offer.salary.toLocaleString("en-NG")}`
                  : "—"}
              </p>
            </div>

          </div>
        </div>

        {/* Offer Message */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Offer Details
          </h2>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-7 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {offer.description || "No additional offer details provided."}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-8 space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          <p>
            We are delighted to extend this opportunity to you and look
            forward to the contributions you will make to the team.
          </p>

          <p>
            Please review the terms of this offer carefully. By accepting
            below, you confirm your willingness to accept the position and
            the terms outlined in this offer.
          </p>

          <p>
            We look forward to welcoming you to{" "}
            <strong className="text-zinc-900 dark:text-white">
              {offer.companyName || "the company"}
            </strong>
            .
          </p>
        </div>

        {/* Signature */}
        <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sincerely,
          </p>

          <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
            {offer.createdByName || "Hiring Team"}
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Hiring Team
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {offer.companyName || "Company"}
          </p>
        </div>

        {/* Actions */}
        {offer.status === "Sent" && (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/60">

            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Please indicate your decision regarding this employment offer.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => {
                  console.log("ACCEPT BUTTON CLICKED");
                  console.log("CANDIDATE ID:", candidate.id);
                  acceptOffer(candidate.id);
                }}
                className="w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
              >
                Accept Offer
              </button>

              <button
                type="button"
                onClick={() => declineOffer(candidate.id)}
                className="w-full rounded-2xl border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
              >
                Decline Offer
              </button>

            </div>
          </div>
        )}

        {/* Accepted */}
        {offer.status === "Accepted" && (
          <div className="mt-10 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-500/10">
            <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
              ✓ Offer Accepted
            </p>

            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-500">
              Thank you. Your acceptance has been recorded and the company
              has been notified.
            </p>
          </div>
        )}

        {/* Declined */}
        {offer.status === "Declined" && (
          <div className="mt-10 rounded-2xl bg-red-50 p-6 text-center dark:bg-red-500/10">
            <p className="text-lg font-semibold text-red-700 dark:text-red-400">
              Offer Declined
            </p>

            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              This offer has been declined. Thank you for taking the time to
              consider the opportunity.
            </p>
          </div>
        )}

      </div>
    </div>
    </div>
  );
};

export default CandidateOffer;