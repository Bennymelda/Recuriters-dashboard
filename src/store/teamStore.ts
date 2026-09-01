

import { create } from "zustand";
import type { TeamMember, TeamActivity, TeamInvitation, TeamRole } from "../types/team";
import { teamMembers } from "../data/team";
import { useCompanyStore } from "./companyStore";
import {
 
 doc,

 setDoc,
 
 getDoc,
 updateDoc,
 collection,
 getDocs,
 query,
 where,
} from "firebase/firestore";

import { db } from "../firebase";
const STORAGE_KEY = "careerflow-team";

interface InviteMemberData {
 fullName: string;
 email: string;
 role: TeamRole;
 companyId:string;
}

interface TeamStore {
 // -----------------------------
 // State
 // -----------------------------

 members: TeamMember[];

 selectedMemberId: string | null;
 invitations: TeamInvitation[];

 getInvitation: (invitationId: string) => TeamInvitation | undefined;
createInvitation: (data: InviteMemberData) => Promise<string>;
 
 // Firestore-based invitation operations
 fetchInvitationFromFirestore: (invitationId: string) => Promise<TeamInvitation | null>;
 acceptInvitationInFirestore: (invitationId: string) => Promise<void>;
 createTeamMemberInFirestore: (member: TeamMember) => Promise<void>;
 updateTeamMemberPhone: (companyId: string, userId: string, phone: string) => Promise<void>;
 syncTeamMembersFromFirestore: (companyId: string) => Promise<void>;
 
 // Members
 // -----------------------------

 setMembers: (members: TeamMember[]) => void;

 clearMembers: () => void;

 inviteMember: (data: InviteMemberData) => void;

 updateMember: (member: TeamMember) => void;

 deleteMember: (id: string) => void;

 deactivateMember: (id: string) => void;

 activateMember: (id: string) => void;

 // -----------------------------
 // Invitation / Membership
 // -----------------------------

 acceptInvitation: (id: string) => void;

 // -----------------------------
 // Job Assignments
 // -----------------------------

 assignJobs: (
 memberId: string,
 jobIds: string[]
 ) => void;

 removeJobAssignment: (
 memberId: string,
 jobId: string
 ) => void;

 // -----------------------------
 // Selection
 // -----------------------------
addPendingMember: (
 invitationId: string
) => void;
 selectMember: (id: string) => void;

 clearSelectedMember: () => void;

 // -----------------------------
 // Activity
 // -----------------------------

 addActivity: (
 memberId: string,
 activity: {
 id?: string;
 action: string;
 recruiterName: string;
 target: string;
 secondaryTarget?: string;
 date?: string;
 category?:
 | "interview"
 | "pipeline"
 | "job"
 | "team"
 | "candidate";
 }
 ) => void;
}

// -----------------------------------------
// Load persisted state
// -----------------------------------------

const loadPersistedTeamState = () => {
 if (typeof window === "undefined") {
 return {
 members: teamMembers as TeamMember[],
 selectedMemberId: null as string | null,
  invitations: [] as TeamInvitation[],
 };
 }

 try {
 const saved = window.localStorage.getItem(
 STORAGE_KEY
 );

 if (!saved) {
 return {
 members: teamMembers as TeamMember[],
 selectedMemberId: null as string | null,
  invitations: [] as TeamInvitation[],
 };
 }

 const parsed = JSON.parse(saved) as Partial<TeamStore>;

 return {
 members: Array.isArray(parsed.members)
 ? (parsed.members as TeamMember[])
 : (teamMembers as TeamMember[]),

 selectedMemberId:
 typeof parsed.selectedMemberId === "string" ||
 parsed.selectedMemberId === null
 ? parsed.selectedMemberId
 : null,

 invitations: Array.isArray(parsed.invitations)
 ? (parsed.invitations as TeamInvitation[])
 : [],
 };
 } catch {
 return {
 members: teamMembers as TeamMember[],
 selectedMemberId: null as string | null,
  invitations: [] as TeamInvitation[],
 };
 }
};

// -----------------------------------------
// Persist state
// -----------------------------------------

const persistTeamState = (
 state: Pick<
 TeamStore,
 "members" | "selectedMemberId" | "invitations"
 >
) => {
 if (typeof window === "undefined") return;

 try {
 window.localStorage.setItem(
 STORAGE_KEY,
 JSON.stringify(state)
 );
 } catch {
 // Ignore storage errors.
 }
};

// -----------------------------------------
// Resolve member ID
// -----------------------------------------

const resolveMemberId = (
 members: TeamMember[],
 memberId: string | null | undefined
) => {
 if (!memberId) return null;

 if (
 members.some(
 (member) => member.id === memberId
 )
 ) {
 return memberId;
 }

 const suffixMatch =
 memberId.match(/(\d+)$/)?.[1];

 if (!suffixMatch) return null;

 const normalizedSuffix =
 suffixMatch.replace(/^0+/, "");

 const fallbackIds = [
 `team_${normalizedSuffix}`,
 `team_${suffixMatch}`,
 `member_${normalizedSuffix}`,
 `member_${suffixMatch}`,
 ];

 return (
 members.find((member) =>
 fallbackIds.includes(member.id)
 )?.id ?? null
 );
};

// -----------------------------------------
// Store
// -----------------------------------------

export const useTeamStore = create<TeamStore>(
 (set, get) => ({
 ...loadPersistedTeamState(),

 // =====================================
 // MEMBERS
 // =====================================

 setMembers: (members) =>
 set((state) => {
 const nextState = {
 ...state,
 members,
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // INVITE MEMBER
 // =====================================





 // =====================================
 // UPDATE MEMBER
 // =====================================

 updateMember: (updatedMember) =>
 set((state) => {
 const nextState = {
 ...state,

 members: state.members.map(
 (member) =>
 member.id === updatedMember.id
 ? updatedMember
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),



deleteMember: (id) =>
 set((state) => {
 const member = state.members.find(
 (member) => member.id === id
 );

 if (!member) {
 return state;
 }

 const nextState = {
 ...state,

 members: state.members.filter(
 (member) => member.id !== id
 ),

 invitations: member.invitationId
 ? state.invitations.map((invitation) =>
 invitation.id === member.invitationId &&
 invitation.status === "Pending"
 ? {
 ...invitation,
 status: "Expired" as const,
 }
 : invitation
 )
 : state.invitations,

 selectedMemberId:
 state.selectedMemberId === id
 ? null
 : state.selectedMemberId,
 };

 persistTeamState(nextState);

 return nextState;
 }),
 // =====================================
 // DEACTIVATE MEMBER
 // =====================================

 deactivateMember: (id) =>
 set((state) => {
 const nextState = {
 ...state,

 members: state.members.map(
 (member) =>
 member.id === id
 ? {
 ...member,
 membershipStatus:
 "Inactive" as const,
 presenceStatus:
 "Offline" as const,
 }
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // ACTIVATE MEMBER
 // =====================================

 activateMember: (id) =>
 set((state) => {
 const nextState = {
 ...state,

 members: state.members.map(
 (member) =>
 member.id === id
 ? {
 ...member,
 membershipStatus:
 "Active" as const,
 }
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // ACCEPT INVITATION
 // =====================================
acceptInvitation: (invitationId) =>
 set((state) => {
 const invitation = state.invitations.find(
 (item) => item.id === invitationId
 );

 if (!invitation) {
 return state;
 }

 const now = new Date().toISOString();

 const nextState = {
 ...state,

 invitations: state.invitations.map(
 (item) =>
 item.id === invitationId
 ? {
 ...item,
 status: "Accepted" as const,
 acceptedAt: now,
 }
 : item
 ),

 members: state.members.map(
 (member) =>
 member.invitationId === invitationId
 ? {
 ...member,

 membershipStatus:
 "Active" as const,

 presenceStatus:
 "Online" as const,

 joinedAt:
 member.joinedAt ?? now,

 lastActive: now,
 }
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),


 // =====================================
 // ASSIGN JOBS
 // =====================================

 assignJobs: (
 memberId,
 jobIds
 ) =>
 set((state) => {
 const resolvedMemberId =
 resolveMemberId(
 state.members,
 memberId
 );

 if (!resolvedMemberId) {
 return state;
 }

 const nextState = {
 ...state,

 members: state.members.map(
 (member) =>
 member.id === resolvedMemberId
 ? {
 ...member,
 assignedJobIds: [
 ...new Set(jobIds),
 ],
 }
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // REMOVE JOB ASSIGNMENT
 // =====================================

 removeJobAssignment: (
 memberId,
 jobId
 ) =>
 set((state) => {
 const resolvedMemberId =
 resolveMemberId(
 state.members,
 memberId
 );

 if (!resolvedMemberId) {
 return state;
 }

 const nextState = {
 ...state,

 members: state.members.map(
 (member) =>
 member.id === resolvedMemberId
 ? {
 ...member,

 assignedJobIds:
 member.assignedJobIds.filter(
 (id) => id !== jobId
 ),
 }
 : member
 ),
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // SELECTION
 // =====================================

 selectMember: (id) =>
 set((state) => {
 const nextState = {
 ...state,
 selectedMemberId: id,
 };

 persistTeamState(nextState);

 return nextState;
 }),

 clearSelectedMember: () =>
 set((state) => {
 const nextState = {
 ...state,
 selectedMemberId: null,
 };

 persistTeamState(nextState);

 return nextState;
 }),

 // =====================================
 // ACTIVITY
 // =====================================

 addActivity: (memberId, activity) =>
 set((state) => {
  const resolvedMemberId = resolveMemberId(state.members, memberId);

  if (!resolvedMemberId) return state;

  const fullActivity: TeamActivity = {
   id: activity.id ?? crypto.randomUUID(),
   action: activity.action,
   recruiterName: activity.recruiterName,
   target: activity.target,
   secondaryTarget: activity.secondaryTarget,
   date: activity.date ?? new Date().toISOString(),
   category: activity.category,
  };

  const nextState = {
   ...state,
   members: state.members.map((member) =>
    member.id === resolvedMemberId
     ? {
       ...member,
       recentActivity: [fullActivity, ...member.recentActivity],
       lastActive: new Date().toISOString(),
      }
     : member
   ),
  };

  persistTeamState(nextState);
  return nextState;
 }),

 getInvitation: (invitationId): TeamInvitation | undefined =>
 get().invitations.find(
 (invitation) => invitation.id === invitationId
 ),

 // Fetch invitation from Firestore
 fetchInvitationFromFirestore: async (invitationId: string): Promise<TeamInvitation | null> => {
 try {
 const invitationRef = doc(db, "invitations", invitationId);
 const invitationSnap = await getDoc(invitationRef);
 
 if (invitationSnap.exists()) {
 return invitationSnap.data() as TeamInvitation;
 }
 
 return null;
 } catch (error) {
 console.error("Error fetching invitation from Firestore:", error);
 return null;
 }
 },

 // Accept invitation in Firestore and create/update team member
 acceptInvitationInFirestore: async (invitationId: string): Promise<void> => {
 try {
 const now = new Date().toISOString();
 
 // Update invitation status to "Accepted"
 const invitationRef = doc(db, "invitations", invitationId);
 await updateDoc(invitationRef, {
 status: "Accepted",
 acceptedAt: now,
 });
 } catch (error) {
 console.error("Error accepting invitation in Firestore:", error);
 throw error;
 }
 },

 // Create a new team member record in Firestore OR update existing one
 createTeamMemberInFirestore: async (member: TeamMember): Promise<void> => {
 try {
 // If this member has an invitationId, try to find and update the existing pending member
 if (member.invitationId) {
 const q = query(
 collection(db, "teamMembers"),
 where("invitationId", "==", member.invitationId)
 );
 const querySnapshot = await getDocs(q);
 
 if (!querySnapshot.empty) {
 // Found an existing pending member - UPDATE it instead of creating a duplicate
 const existingMemberDoc = querySnapshot.docs[0];
 const existingMember = existingMemberDoc.data() as TeamMember;
 
 // Keep the original member ID, just update the status and new fields
 const memberRef = doc(db, "teamMembers", existingMember.id);
 await updateDoc(memberRef, {
 // Update with authenticated user data
 fullName: member.fullName,
 email: member.email,
 phone: member.phone,
 avatar: member.avatar,
 
 // Update membership status
 membershipStatus: "Active",
 presenceStatus: "Online",
 joinedAt: member.joinedAt,
 lastActive: member.lastActive,
 
 // Keep the rest of the member data
 });
 
 console.log("Updated existing team member:", existingMember.id);
 return;
 }
 }
 
 // No existing member found, create a new one
 const memberRef = doc(db, "teamMembers", member.id);
 await setDoc(memberRef, {
 ...member,
 membershipStatus: "Active",
 });
 
 console.log("Created new team member:", member.id);
 } catch (error) {
 console.error("Error creating/updating team member in Firestore:", error);
 throw error;
 }
 },

 // Update team member phone number (after profile update)
 updateTeamMemberPhone: async (companyId: string, userId: string, phone: string): Promise<void> => {
 try {
 // Find the team member by userId (authenticated user ID)
 const q = query(
 collection(db, "teamMembers"),
 where("companyId", "==", companyId),
 where("id", "==", userId)
 );
 const querySnapshot = await getDocs(q);
 
 if (!querySnapshot.empty) {
 const memberDoc = querySnapshot.docs[0];
 const memberRef = doc(db, "teamMembers", memberDoc.id);
 
 await updateDoc(memberRef, {
 phone: phone,
 lastActive: new Date().toISOString(),
 });
 
 console.log("Updated team member phone:", memberDoc.id);
 }
 } catch (error) {
 console.error("Error updating team member phone:", error);
 // Don't throw - phone update is optional and shouldn't break the flow
 }
 },

 // Sync team members from Firestore to Zustand
 syncTeamMembersFromFirestore: async (companyId: string): Promise<void> => {
 try {
 const q = query(
 collection(db, "teamMembers"),
 where("companyId", "==", companyId)
 );
 const querySnapshot = await getDocs(q);
 const firestoreMembers: TeamMember[] = [];
 
 querySnapshot.forEach((doc) => {
 firestoreMembers.push(doc.data() as TeamMember);
 });
 
 // Merge with existing Zustand members to preserve local state
 set((state) => {
 const merged = [...state.members];
 
 firestoreMembers.forEach((fsMember) => {
 const existingIndex = merged.findIndex(
 (m) => m.id === fsMember.id
 );
 
 if (existingIndex >= 0) {
 // Update existing member with Firestore data
 merged[existingIndex] = {
 ...merged[existingIndex],
 ...fsMember,
 membershipStatus: fsMember.membershipStatus,
 presenceStatus: fsMember.presenceStatus,
 lastActive: fsMember.lastActive,
 };
 } else {
 // Add new member from Firestore
 merged.push(fsMember);
 }
 });
 
 const nextState = {
 ...state,
 members: merged,
 };
 
 persistTeamState(nextState);
 
 return nextState;
 });
 } catch (error) {
 console.error("Error syncing team members from Firestore:", error);
 throw error;
 }
 },

 createInvitation: async ({
 fullName,
 email,
 role,
 companyId,
}) => {
 const invitationId = crypto.randomUUID();
 const now = new Date().toISOString();

 const company =
 useCompanyStore.getState().company;

 const invitation: TeamInvitation = {
 id: invitationId,
 companyId,
 companyName: company?.companyName ?? "",
 fullName: fullName.trim(),
 email: email.trim().toLowerCase(),
 role,
 status: "Pending",
 invitedAt: now,
 };

 // Save ONLY the invitation to Firestore
 await setDoc(
 doc(db, "invitations", invitationId),
 invitation
 );

 set((state) => {
 const nextState = {
 ...state,

 invitations: [
 ...state.invitations,
 invitation,
 ],
 };

 persistTeamState(nextState);

 return nextState;
 });

 return invitationId;
},





 inviteMember: (data) =>
 set((state) => {
 const now = new Date().toISOString();
 const invitationId = crypto.randomUUID();
 const company = useCompanyStore.getState().company;

 const invitation: TeamInvitation = {
 id: invitationId,
 companyId: data.companyId,
 companyName: company?.companyName ?? "",
 fullName: data.fullName.trim(),
 email: data.email.trim().toLowerCase(),
 role: data.role,

 status: "Pending",
 invitedAt: now,
 };

 const newMember: TeamMember = {
 id: crypto.randomUUID(),
 companyId: data.companyId,
 invitationId,
 fullName: data.fullName.trim(),
 email: data.email.trim().toLowerCase(),
 phone: "",
 avatar: "",
 companyName: company?.companyName ?? "",
 role: data.role,
 department: "",
 membershipStatus: "Pending",
 presenceStatus: "Offline",
 assignedJobIds: [],
 candidatesHandled: 0,
 interviewsThisWeek: 0,
 offersMade: 0,
 successfulHires: 0,
 averageHiringDays: 0,
 performanceScore: 0,
 recentActivity: [],
 invitedAt: now,
 createdAt: now,
 };

 const nextState = {
 ...state,
 invitations: [...state.invitations, invitation],
 members: [...state.members, newMember],
 };

 persistTeamState(nextState);
 return nextState;
 }),

 addPendingMember: (invitationId) => {
 const invitation = get().invitations.find(
 (item) => item.id === invitationId
 );

 if (!invitation) return;

 const newMember: TeamMember = {
 id: crypto.randomUUID(),

 companyId: invitation.companyId,
 invitationId: invitation.id,

 fullName: invitation.fullName,
 email: invitation.email,

 phone: "",
 avatar: "",

 companyName: invitation.companyName,

 role: invitation.role,
 department: "",

 membershipStatus: "Pending",

 presenceStatus: "Offline",

 assignedJobIds: [],

 candidatesHandled: 0,
 interviewsThisWeek: 0,
 offersMade: 0,
 successfulHires: 0,
 averageHiringDays: 0,
 performanceScore: 0,

 recentActivity: [],

 invitedAt: invitation.invitedAt,

 createdAt: new Date().toISOString(),
 };

 set((state) => {
 const nextState = {
 ...state,

 members: [
 ...state.members,
 newMember,
 ],
 };

 persistTeamState(nextState);

 return nextState;
 });
},
 // =====================================
 // CLEAR MEMBERS
 // =====================================
 clearMembers: () =>
 set((state) => {
 const nextState = {
 ...state,

 members: [],

 selectedMemberId: null,
 };

 persistTeamState(nextState);

 return nextState;
 }),
 })
);