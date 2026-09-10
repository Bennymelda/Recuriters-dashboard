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
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-10 dark:bg-zinc-900">

        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Job Offer
          </p>

          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
            Congratulations, {candidate.fullName}! 🎉
          </h1>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            We are pleased to offer you the position of{" "}
            <strong>{candidate.appliedRole}</strong> at{" "}
            <strong>{offer.companyName}</strong>.
          </p>
        </div>

        {/* Offer details */}
        <div className="mt-8 space-y-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Company
            </p>

            <p className="mt-1 font-medium text-zinc-900 dark:text-white">
              {offer.companyName || "—"}
            </p>
          </div>

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
              Salary
            </p>

            <p className="mt-1 font-medium text-zinc-900 dark:text-white">
              ₦{offer.salary?.toLocaleString() || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Start Date
            </p>

            <p className="mt-1 font-medium text-zinc-900 dark:text-white">
              {offer.startDate || "—"}
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

          {/* Message */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Offer Message
            </p>

            <div className="mt-2 rounded-2xl bg-zinc-50 p-5 text-sm leading-7 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {offer.description || "No additional message provided."}
            </div>
          </div>
        </div>

        {/* Actions */}
        {offer.status === "Sent" && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

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
        )}

        {offer.status === "Accepted" && (
          <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-center dark:bg-emerald-500/10">
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              Offer Accepted
            </p>

            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-500">
              Thank you. The company has been notified of your acceptance.
            </p>
          </div>
        )}

        {offer.status === "Declined" && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-center dark:bg-red-500/10">
            <p className="font-semibold text-red-700 dark:text-red-400">
              Offer Declined
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              This offer has been declined.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CandidateOffer;