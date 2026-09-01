

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
 savePendingMemberToFirestore: (invitationId: string) => Promise<string>;
 deleteInvitationFromFirestore: (invitationId: string) => Promise<void>;
 
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
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        members: teamMembers as TeamMember[],
        selectedMemberId: null as string | null,
        invitations: [] as TeamInvitation[],
      };
    }

    const parsed = JSON.parse(saved) as Partial<TeamStore>;
    const savedMembers = Array.isArray(parsed.members) ? (parsed.members as TeamMember[]) : [];

    // Combine dummy team members and saved members to ensure dummy data is never removed
    const memberMap = new Map<string, TeamMember>();
    (teamMembers as TeamMember[]).forEach((m) => memberMap.set(m.id, m));
    savedMembers.forEach((m) => memberMap.set(m.id, m));

    return {
      members: Array.from(memberMap.values()),
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

 inviteMember: (data) => {
    get().createInvitation(data).catch((error) => {
      console.error("Error in inviteMember:", error);
    });
  },

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

 // Sync to Firestore
 updateDoc(
 doc(db, "teamMembers", updatedMember.id),
 updatedMember as unknown as Record<string, unknown>
 ).catch((error) => {
 console.error("Error updating team member in Firestore:", error);
 });

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

 // Delete from Firestore
 const memberRef = doc(db, "teamMembers", id);
 updateDoc(memberRef, {
 membershipStatus: "Inactive",
 presenceStatus: "Offline",
 }).catch((error) => {
 console.error("Error marking team member as inactive in Firestore:", error);
 });

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

 // Sync to Firestore
 updateDoc(
 doc(db, "teamMembers", id),
 {
 membershipStatus: "Inactive",
 presenceStatus: "Offline",
 }
 ).catch((error) => {
 console.error("Error deactivating team member in Firestore:", error);
 });

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

 // Sync to Firestore
 updateDoc(
 doc(db, "teamMembers", id),
 {
 membershipStatus: "Active",
 }
 ).catch((error) => {
 console.error("Error activating team member in Firestore:", error);
 });

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

 // Sync the updated member to Firestore
 const acceptedMember = nextState.members.find(
 (m) => m.invitationId === invitationId
 );
 if (acceptedMember) {
 updateDoc(
 doc(db, "teamMembers", acceptedMember.id),
 {
 membershipStatus: "Active",
 presenceStatus: "Online",
 joinedAt: acceptedMember.joinedAt,
 lastActive: now,
 }
 ).catch((error) => {
 console.error("Error updating member after accepting invitation:", error);
 });
 }

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

 // Sync to Firestore
 updateDoc(
 doc(db, "teamMembers", resolvedMemberId),
 {
 assignedJobIds: [...new Set(jobIds)],
 }
 ).catch((error) => {
 console.error("Error assigning jobs in Firestore:", error);
 });

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

 // Sync to Firestore
 const member = state.members.find((m) => m.id === resolvedMemberId);
 if (member) {
 updateDoc(
 doc(db, "teamMembers", resolvedMemberId),
 {
 assignedJobIds: member.assignedJobIds.filter((id) => id !== jobId),
 }
 ).catch((error) => {
 console.error("Error removing job assignment in Firestore:", error);
 });
 }

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

  const member = state.members.find((m) => m.id === resolvedMemberId);
  if (!member) return state;

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

  // Sync to Firestore
  updateDoc(
   doc(db, "teamMembers", resolvedMemberId),
   {
    recentActivity: [fullActivity, ...member.recentActivity],
    lastActive: new Date().toISOString(),
   }
  ).catch((error) => {
   console.error("Error adding activity in Firestore:", error);
  });

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
      
      set((state) => {
        const memberMap = new Map<string, TeamMember>();

        // 1. Always keep initial dummy team members
        (teamMembers as TeamMember[]).forEach((dummyMember) => {
          memberMap.set(dummyMember.id, dummyMember);
        });

        // 2. Add existing state members (preserves local edits/additions)
        state.members.forEach((mem) => {
          memberMap.set(mem.id, mem);
        });

        // 3. Merge in Firestore members (adds new invited team members from cloud)
        firestoreMembers.forEach((fsMem) => {
          memberMap.set(fsMem.id, fsMem);
        });

        const nextState = {
          ...state,
          members: Array.from(memberMap.values()),
        };
        
        persistTeamState(nextState);
        return nextState;
      });
    } catch (error) {
      console.error("Error syncing team members from Firestore:", error);
      throw error;
    }
  },

  // Create invitation document AND pending team member in Firestore
  createInvitation: async ({
    fullName,
    email,
    role,
    companyId,
  }) => {
    const invitationId = crypto.randomUUID();
    const pendingMemberId = crypto.randomUUID();
    const now = new Date().toISOString();

    const company = useCompanyStore.getState().company;

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

    const pendingMember: TeamMember = {
      id: pendingMemberId,
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
      createdAt: now,
    };

    // Save invitation document to Firestore
    await setDoc(doc(db, "invitations", invitationId), invitation);

    // Save pending member to Firestore immediately
    await setDoc(doc(db, "teamMembers", pendingMemberId), pendingMember);

    // Add both to Zustand for tracking and instant UI reactivity
    set((state) => {
      const nextState = {
        ...state,
        invitations: [...state.invitations.filter((i) => i.id !== invitationId), invitation],
        members: [...state.members.filter((m) => m.id !== pendingMemberId), pendingMember],
      };

      persistTeamState(nextState);
      return nextState;
    });

    return invitationId;
  },

  // Save pending member AFTER email is successfully sent (or as explicit method)
  savePendingMemberToFirestore: async (
    invitationId: string
  ): Promise<string> => {
    const state = get();
    const invitation = state.invitations.find(
      (inv) => inv.id === invitationId
    );

    if (!invitation) {
      throw new Error("Invitation not found");
    }

    // Check if pending member already exists in state
    const existingMember = state.members.find((m) => m.invitationId === invitationId);
    if (existingMember) {
      await setDoc(doc(db, "teamMembers", existingMember.id), existingMember);
      return existingMember.id;
    }

    const pendingMemberId = crypto.randomUUID();
    const now = new Date().toISOString();

    const pendingMember: TeamMember = {
      id: pendingMemberId,
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
      createdAt: now,
    };

    // Save pending member to Firestore
    await setDoc(doc(db, "teamMembers", pendingMemberId), pendingMember);

    // Add to Zustand
    set((state) => {
      const nextState = {
        ...state,
        members: [...state.members, pendingMember],
      };

      persistTeamState(nextState);
      return nextState;
    });

    return pendingMemberId;
  },

  // Delete invitation from Firestore (cleanup after explicit cancel)
  deleteInvitationFromFirestore: async (
    invitationId: string
  ): Promise<void> => {
    try {
      const invitationRef = doc(db, "invitations", invitationId);
      await updateDoc(invitationRef, {
        status: "Expired",
      } as unknown as Record<string, unknown>);

      // Remove from Zustand
      set((state) => {
        const nextState = {
          ...state,
          invitations: state.invitations.filter(
            (inv) => inv.id !== invitationId
          ),
          members: state.members.filter(
            (m) => m.invitationId !== invitationId
          ),
        };

        persistTeamState(nextState);
        return nextState;
      });
    } catch (error) {
      console.error("Error cleaning up invitation:", error);
    }
  },

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