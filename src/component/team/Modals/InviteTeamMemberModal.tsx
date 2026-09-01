import { useState } from "react";
import { MdClose, MdEmail, MdPerson, MdWorkOutline, MdContentCopy, MdCheck } from "react-icons/md";

import type { TeamRole } from "../../../types/team";
import { useTeamStore } from "../../../store/teamStore";
import { useCompanyStore } from "../../../store/companyStore";
import { useAuthStore } from "../../../store/authStore";

interface InviteTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteTeamMemberModal = ({
  isOpen,
  onClose,
}: InviteTeamMemberModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Link fallback state
  const [generatedInviteLink, setGeneratedInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

  const company = useCompanyStore((state) => state.company);
  const user = useAuthStore((state) => state.user);
  const createInvitation = useTeamStore((state) => state.createInvitation);

  if (!isOpen) return null;

  const targetCompanyId = user?.companyId || company?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setEmailWarning("");
    setGeneratedInviteLink("");

    if (!fullName.trim()) {
      setError("Please enter the team member's name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter an email address.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (!targetCompanyId) {
      setError("Company information could not be found.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Create invitation AND pending member in Firestore & Zustand immediately
      const invitationId = await createInvitation({
        fullName: fullName.trim(),
        email: email.trim(),
        role,
        companyId: targetCompanyId,
      });

      console.log("Invitation & pending member created in Firestore:", invitationId);

      const inviteUrl = `${window.location.origin}/accept-invitation/${invitationId}`;
      setGeneratedInviteLink(inviteUrl);

      // Step 2: Attempt email dispatch with fallback endpoints
      const primaryApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const endpoints = Array.from(
        new Set([
          `${primaryApiUrl}/api/invitations/send`,
          "http://localhost:5000/api/invitations/send",
          "https://recuriters-dashboard-api.onrender.com/api/invitations/send",
        ])
      );

      let emailSentSuccess = false;
      let lastErrorMessage = "";

      for (const endpoint of endpoints) {
        try {
          console.log(`Attempting to send invitation via ${endpoint}...`);
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim(),
              fullName: fullName.trim(),
              companyName: company?.companyName || user?.companyName || "Our Company",
              role,
              invitationId,
            }),
          });

          const data = await res.json().catch(() => null);
          if (res.ok && data?.success) {
            emailSentSuccess = true;
            break;
          } else {
            lastErrorMessage = data?.message || `Server returned status ${res.status}`;
            console.warn(`Endpoint ${endpoint} returned error:`, lastErrorMessage);
          }
        } catch (err) {
          console.warn(`Failed to connect to ${endpoint}:`, err);
          lastErrorMessage = err instanceof Error ? err.message : "Network error";
        }
      }

      if (emailSentSuccess) {
        // Email sent successfully! Clean up and close modal
        setFullName("");
        setEmail("");
        setRole("");
        setError("");
        onClose();
      } else {
        // Email dispatch failed, BUT pending member IS SAVED in Firestore!
        // Show fallback UI to copy the link directly
        setEmailWarning(
          "The team member has been added to your team as Pending in cloud storage. However, automatic email delivery was unavailable. You can copy and share the invitation link below manually:"
        );
      }
    } catch (err) {
      console.error("Failed to process invitation:", err);
      setError("Unable to process invitation. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedInviteLink) return;
    navigator.clipboard.writeText(generatedInviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setRole("");
    setError("");
    setEmailWarning("");
    setGeneratedInviteLink("");
    setCopied(false);
    onClose();
  };

 return (
 <div
 className="
 fixed
 inset-0
 z-[100]
 flex
 items-center
 justify-center
 bg-black/50
 px-4
 backdrop-blur-sm
 "
 onMouseDown={handleClose}
 >
 <div
 className="
 w-full
 max-w-md
 overflow-hidden
 rounded-3xl
 bg-white
 shadow-2xl
 dark:bg-zinc-900
 "
 onMouseDown={(e) => e.stopPropagation()}
 >
 {/* Header */}
 <div
 className="
 flex
 items-start
 justify-between
 border-b
 border-zinc-100
 px-6
 py-5
 dark:border-zinc-800
 "
 >
 <div>
 <h2
 className="
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Invite team member
 </h2>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Invite someone to join your recruitment workspace.
 </p>
 </div>

 <button
 type="button"
 onClick={handleClose}
 className="
 flex
 h-9
 w-9
 shrink-0
 cursor-pointer
 items-center
 justify-center
 rounded-xl
 text-zinc-400
 transition
 hover:bg-zinc-100
 hover:text-zinc-700
 dark:hover:bg-zinc-800
 dark:hover:text-zinc-200
 "
 >
 <MdClose size={21} />
 </button>
 </div>

 {/* Form */}
 <form
 onSubmit={handleSubmit}
 className="space-y-5 px-6 py-6"
 >
 {/* Name */}
 <div>
 <label
 htmlFor="fullName"
 className="
 mb-2
 block
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 Full name
 </label>

 <div className="relative">
 <MdPerson
 size={20}
 className="
 absolute
 left-3.5
 top-1/2
 -translate-y-1/2
 text-zinc-400
 dark:text-zinc-500
 "
 />

 <input
 id="fullName"
 type="text"
 value={fullName}
 onChange={(e) =>
 setFullName(e.target.value)
 }
 placeholder="e.g. Sarah Johnson"
 className="
 w-full
 rounded-xl
 border
 border-zinc-200
 bg-white
 py-3
 pl-11
 pr-4
 text-sm
 text-zinc-900
 outline-none
 transition
 placeholder:text-zinc-400
 focus:border-[#285A48]
 focus:ring-2
 focus:ring-[#285A48]/10
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 dark:placeholder:text-zinc-500
 dark:focus:border-[#B0E4CC]
 dark:focus:ring-[#B0E4CC]/10
 "
 />
 </div>
 </div>

 {/* Email */}
 <div>
 <label
 htmlFor="email"
 className="
 mb-2
 block
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 Email address
 </label>

 <div className="relative">
 <MdEmail
 size={20}
 className="
 absolute
 left-3.5
 top-1/2
 -translate-y-1/2
 text-zinc-400
 dark:text-zinc-500
 "
 />

 <input
 id="email"
 type="email"
 value={email}
 onChange={(e) =>
 setEmail(e.target.value)
 }
 placeholder="e.g. sarah@company.com"
 className="
 w-full
 rounded-xl
 border
 border-zinc-200
 bg-white
 py-3
 pl-11
 pr-4
 text-sm
 text-zinc-900
 outline-none
 transition
 placeholder:text-zinc-400
 focus:border-[#285A48]
 focus:ring-2
 focus:ring-[#285A48]/10
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 dark:placeholder:text-zinc-500
 dark:focus:border-[#B0E4CC]
 dark:focus:ring-[#B0E4CC]/10
 "
 />
 </div>
 </div>

 {/* Role */}
 <div>
 <label
 htmlFor="role"
 className="
 mb-2
 block
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 Role
 </label>

 <div className="relative">
 <MdWorkOutline
 size={20}
 className="
 pointer-events-none
 absolute
 left-3.5
 top-1/2
 z-10
 -translate-y-1/2
 text-zinc-400
 dark:text-zinc-500
 "
 />

 <select
 id="role"
 value={role}
 onChange={(e) =>
 setRole(
 e.target.value as TeamRole
 )
 }
 className="
 w-full
 cursor-pointer
 appearance-none
 rounded-xl
 border
 border-zinc-200
 bg-white
 py-3
 pl-11
 pr-10
 text-sm
 text-zinc-900
 outline-none
 transition
 focus:border-[#285A48]
 focus:ring-2
 focus:ring-[#285A48]/10
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 dark:focus:border-[#B0E4CC]
 dark:focus:ring-[#B0E4CC]/10
 "
 >
 <option value="">
 Select a role
 </option>

 <option value="Recruiter">
 Recruiter
 </option>

 <option value="Hiring Manager">
 Hiring Manager
 </option>

 <option value="HR Manager">
 HR Manager
 </option>
 </select>

 <span
 className="
 pointer-events-none
 absolute
 right-4
 top-1/2
 -translate-y-1/2
 text-zinc-400
 "
 >
 ▾
 </span>
 </div>
 </div>

 {/* Email warning banner & copyable link fallback */}
 {emailWarning && (
   <div className="space-y-3 rounded-xl bg-amber-50 p-4 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20">
     <p className="text-xs leading-5 text-amber-800 dark:text-amber-300 font-medium">
       {emailWarning}
     </p>

     {generatedInviteLink && (
       <div className="flex items-center gap-2">
         <input
           type="text"
           readOnly
           value={generatedInviteLink}
           className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-mono text-zinc-800 outline-none dark:border-amber-700 dark:bg-zinc-800 dark:text-zinc-200"
         />
         <button
           type="button"
           onClick={handleCopyLink}
           className="flex items-center gap-1 shrink-0 rounded-lg bg-[#285A48] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#285A48]/90 dark:bg-[#B0E4CC] dark:text-zinc-900"
         >
           {copied ? <MdCheck size={16} /> : <MdContentCopy size={16} />}
           {copied ? "Copied!" : "Copy"}
         </button>
       </div>
     )}
   </div>
 )}

 {/* Error */}
 {error && (
 <div
 className="
 rounded-xl
 bg-red-50
 px-4
 py-3
 text-sm
 font-medium
 text-red-600
 dark:bg-red-500/10
 dark:text-red-400
 "
 >
 {error}
 </div>
 )}

 {/* Info */}
 <div
 className="
 rounded-xl
 bg-[#285A48]/5
 px-4
 py-3
 text-xs
 leading-5
 text-zinc-600
 dark:bg-[#B0E4CC]/10
 dark:text-zinc-400
 "
 >
 The team member will appear as{" "}
 <span className="font-semibold text-[#285A48] dark:text-[#B0E4CC]">
 Pending
 </span>{" "}
 until they accept the invitation.
 </div>

 {/* Actions */}
 <div
 className="
 flex
 flex-col-reverse
 gap-3
 pt-2
 sm:flex-row
 sm:justify-end
 "
 >
 <button
 type="button"
 onClick={handleClose}
 className="
 w-full
 cursor-pointer
 rounded-xl
 border
 border-zinc-200
 px-5
 py-3
 text-sm
 font-semibold
 text-zinc-700
 transition
 hover:bg-zinc-50
 dark:border-zinc-700
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 sm:w-auto
 "
 >
 {emailWarning ? "Close" : "Cancel"}
 </button>

 {!emailWarning && (
 <button
 type="submit"
 disabled={isSubmitting}
 className="
 w-full
 cursor-pointer
 rounded-xl
 bg-[#285A48]
 px-5
 py-3
 text-sm
 font-semibold
 text-white
 shadow-sm
 transition
 hover:bg-[#285A48]/90
 hover:shadow-md
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 dark:hover:bg-[#B0E4CC]/90
 sm:w-auto
 "
 >
     {isSubmitting ? "Sending..." : "Send invitation"}
 </button>
 )}
 </div>
 </form>
 </div>
 </div>
 );
};

export default InviteTeamMemberModal;