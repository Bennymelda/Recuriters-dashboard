import { useParams, useNavigate } from "react-router-dom";
//import { useTeamStore } from "../../store/teamStore";
import { useState,useEffect } from "react";
import { doc, getDoc, updateDoc} from "firebase/firestore";

import { db } from "../../firebase";

import type { TeamInvitation } from "../../types/team";
const AcceptInvitation = () => {
 const { invitationId } = useParams<{
 invitationId: string;
 }>();
console.log("Invitation ID from URL:", invitationId);
const [invitation, setInvitation] =
 useState<TeamInvitation | null>(null);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

useEffect(() => {
 const fetchInvitation = async () => {
 if (!invitationId) {
 setError("Invitation link is invalid.");
 setLoading(false);
 return;
 }

 try {
 const invitationRef = doc(
 db,
 "invitations",
 invitationId
 );

 const invitationSnap =
 await getDoc(invitationRef);

 if (!invitationSnap.exists()) {
 setError(
 "This invitation could not be found."
 );
 setLoading(false);
 return;
 }

 setInvitation(
 invitationSnap.data() as TeamInvitation
 );
 } catch (error) {
 console.error(
 "Error fetching invitation:",
 error
 );

 setError(
 "Unable to load this invitation."
 );
 } finally {
 setLoading(false);
 }
 };

 fetchInvitation();
}, [invitationId]);



 const navigate = useNavigate();
/*
 const getInvitation = useTeamStore(
 (state) => state.getInvitation
 );

 const [error, setError] = useState("");

 const invitation = invitationId
 ? getInvitation(invitationId)
 : undefined;
*/
const handleAccept = async () => {
 setError("");

 if (!invitation) {
 setError("This invitation could not be found.");
 return;
 }

 if (invitation.status !== "Pending") {
 setError("This invitation is no longer available.");
 return;
 }

 try {
 const invitationRef = doc(
 db,
 "invitations",
 invitation.id
 );

 await updateDoc(invitationRef, {
 status: "Accepted",
 acceptedAt: new Date().toISOString(),
 });

 navigate(
 `/signup?invitationId=${invitation.id}`
 );
 } catch (error) {
 console.error(
 "Error accepting invitation:",
 error
 );

 setError(
 "Unable to accept this invitation. Please try again."
 );
 }
};

 if (!invitation) {
 return (
 <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
 <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-zinc-900">
 <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
 Invitation not found
 </h1>

 <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
 This invitation may have expired or does not exist.
 </p>
 </div>
 </div>
 );
 }
if (loading) {
 return (
 <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Loading invitation...
 </p>
 </div>
 );
}
 return (
 <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
 <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">

 <div className="text-center">

 <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
 You're invited!
 </h1>

 <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 You have been invited to join{" "}
 <span className="font-semibold text-zinc-800 dark:text-white">
 {invitation.companyName}
 </span>
 .
 </p>

 </div>

 <div className="mt-8 space-y-4 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800">

 <div>
 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 Name
 </p>

 <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
 {invitation.fullName}
 </p>
 </div>

 <div>
 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 Email
 </p>

 <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
 {invitation.email}
 </p>
 </div>

 <div>
 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 Role
 </p>

 <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
 {invitation.role}
 </p>
 </div>

 </div>

 {error && (
 <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
 {error}
 </div>
 )}

 <button
 type="button"
 onClick={handleAccept}
 className="mt-6 w-full rounded-2xl bg-[#285A48] py-3 font-semibold text-white transition hover:bg-[#285A48]/90 dark:bg-[#B0E4CC] dark:text-zinc-900"
 >
 Accept Invitation
 </button>

 </div>
 </div>
 );
};

export default AcceptInvitation;