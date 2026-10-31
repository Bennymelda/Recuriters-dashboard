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

  console.log("🔥🔥🔥 CANDIDATE OFFER PAGE IS RENDERING 🔥🔥🔥");

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
        <div className="bg-white px-8 py-7 text-center shadow-sm dark:bg-zinc-900">
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
        <div className="bg-white px-8 py-7 text-center shadow-sm dark:bg-zinc-900">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
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

  const formattedOfferDate = offer.sentAt
    ? new Date(offer.sentAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const formattedStartDate = offer.startDate
    ? new Date(`${offer.startDate}T00:00:00`).toLocaleDateString(
        "en-NG",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "a date to be confirmed";

  const formattedSalary = offer.salary
    ? `₦${offer.salary.toLocaleString("en-NG")}`
    : "the agreed salary";

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-8 dark:bg-zinc-950 sm:py-12">
      <main className="mx-auto max-w-3xl bg-white shadow-sm dark:bg-zinc-900">
        {/* Header */}
        <header className="border-b border-zinc-200 px-6 py-7 sm:px-12 sm:py-9 dark:border-zinc-700">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                {offer.companyName || "Company Name"}
              </h1>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Employment Offer
              </p>
            </div>

            <p className="shrink-0 text-right text-sm text-zinc-500 dark:text-zinc-400">
              {formattedOfferDate}
            </p>
          </div>
        </header>

        {/* Letter */}
        <article className="px-6 py-9 sm:px-12 sm:py-12">
          <p className="text-base font-medium text-zinc-900 dark:text-white">
            Dear {candidate.fullName},
          </p>

          <div className="mt-7 space-y-6 text-[15px] leading-8 text-zinc-600 dark:text-zinc-300">
            <p>
              We are pleased to formally offer you employment with{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {offer.companyName || "our company"}
              </strong>{" "}
              for the position of{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {candidate.appliedRole}
              </strong>
              .
            </p>

            <p>
              Following the completion of our recruitment and interview
              process, we were impressed by your qualifications, experience,
              and skills. We believe you would be a valuable addition to our
              team and are pleased to invite you to join us.
            </p>

            <p>
              This position will be offered on a{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {offer.employmentType || "full-time"}
              </strong>{" "}
              basis. Your starting compensation will be{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {formattedSalary}
              </strong>
              . Your expected start date will be{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {formattedStartDate}
              </strong>
              .
            </p>

            {offer.description && (
              <div className="whitespace-pre-line">
                {offer.description}
              </div>
            )}

            <p>
              We are delighted to extend this opportunity to you and look
              forward to the contributions you will make to the team. We hope
              you will find this opportunity both rewarding and fulfilling.
            </p>

            <p>
              Please review the terms of this offer carefully. By accepting
              this offer, you confirm your willingness to accept the position
              and the terms outlined above.
            </p>

            <p>
              We look forward to welcoming you to{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                {offer.companyName || "the company"}
              </strong>
              .
            </p>
          </div>

          {/* Signature */}
          <div className="mt-12 border-t border-zinc-200 pt-7 dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Sincerely,
            </p>

            <p className="mt-3 font-semibold text-zinc-900 dark:text-white">
              {offer.createdByName || "Hiring Team"}
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Hiring Team
            </p>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {offer.companyName || "Company"}
            </p>
          </div>

          {/* Actions */}
          {offer.status === "Sent" && (
            <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
              <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Please indicate your decision below. By accepting, you confirm
                that you agree to the terms of this offer.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={async () => {
                    console.log("🚨 ACCEPT BUTTON CLICKED");

                    console.log(
                      "🚨 ACCEPT FUNCTION:",
                      acceptOffer
                    );

                    console.log(
                      "🚨 CANDIDATE ID:",
                      candidate?.id
                    );

                    if (!candidate?.id) {
                      console.error("❌ No candidate ID");
                      return;
                    }

                    await acceptOffer(candidate.id);

                    console.log(
                      "🚨 ACCEPT OFFER FUNCTION FINISHED"
                    );

                    setCandidate((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: "Hired",
                            offer: {
                              ...prev.offer!,
                              status: "Accepted",
                              respondedAt:
                                new Date().toISOString(),
                            },
                          }
                        : prev
                    );
                  }}
                  className="w-full bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
                >
                  Accept Offer
                </button>

                <button
                  type="button"
                  onClick={() => declineOffer(candidate.id)}
                  className="w-full border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
                >
                  Decline Offer
                </button>
              </div>
            </div>
          )}

          {/* Accepted */}
          {offer.status === "Accepted" && (
            <div className="mt-12 border-t border-zinc-200 pt-8 text-center dark:border-zinc-700">
              <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                 Offer Accepted
              </p>

              <p className="mt-2 text-sm leading-6 text-emerald-600 dark:text-emerald-500">
                Thank you. Your acceptance has been recorded and the company
                has been notified.
              </p>
            </div>
          )}

          {/* Declined */}
          {offer.status === "Declined" && (
            <div className="mt-12 border-t border-zinc-200 pt-8 text-center dark:border-zinc-700">
              <p className="text-lg font-semibold text-red-700 dark:text-red-400">
                Offer Declined
              </p>

              <p className="mt-2 text-sm leading-6 text-red-600 dark:text-red-500">
                This offer has been declined. Thank you for taking the time to
                consider the opportunity.
              </p>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export default CandidateOffer;