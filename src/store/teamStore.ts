/*

import { create } from "zustand";
import type { TeamMember, TeamActivity } from "../types/team";
import { teamMembers } from "../data/team";

const STORAGE_KEY = "careerflow-team";

interface TeamStore {
 members: TeamMember[];

 selectedMemberId: string | null;

 setMembers: (members: TeamMember[]) => void;
clearMembers: () => void;
 addMember: (member: TeamMember) => void;

 updateMember: (member: TeamMember) => void;

 deleteMember: (id: string) => void;

 selectMember: (id: string) => void;

 clearSelectedMember: () => void;

  addActivity: (
    memberId: string,
    activity: {
      id?: string;
      action: string;
      recruiterName:string;
      target: string;
      secondaryTarget?: string;
      date?: string;
      category?: "interview" | "pipeline" | "job" | "team" | "candidate";
    }
  ) => void;
}

const loadPersistedTeamState = () => {
  if (typeof window === "undefined") {
    return {
      members: teamMembers as TeamMember[],
      selectedMemberId: null as string | null,
    };
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        members: teamMembers as TeamMember[],
        selectedMemberId: null as string | null,
      };
    }


    const parsed = JSON.parse(saved) as Partial<TeamStore>;
    return {
      members: Array.isArray(parsed.members) ? (parsed.members as TeamMember[]) : (teamMembers as TeamMember[]),
      selectedMemberId: typeof parsed.selectedMemberId === "string" || parsed.selectedMemberId === null ? parsed.selectedMemberId : null,
    };
  } catch {
    return {
      members: teamMembers as TeamMember[],
      selectedMemberId: null as string | null,
    };
  }
};

const persistTeamState = (state: Pick<TeamStore, "members" | "selectedMemberId">) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors so the app still works offline.
  }
};

const resolveMemberId = (members: TeamMember[], memberId: string | null | undefined) => {
  if (!memberId) return null;

  if (members.some((member) => member.id === memberId)) {
    return memberId;
  }

  const suffixMatch = memberId.match(/(\d+)$/)?.[1];
  if (!suffixMatch) return null;

  const normalizedSuffix = suffixMatch.replace(/^0+/, "");
  const fallbackIds = [
    `team_${normalizedSuffix}`,
    `team_${suffixMatch}`,
    `member_${normalizedSuffix}`,
    `member_${suffixMatch}`,
  ];

  return members.find((member) => fallbackIds.includes(member.id))?.id ?? null;
};

export const useTeamStore = create<TeamStore>((set) => ({
  ...loadPersistedTeamState(),

  setMembers: (members) =>
  set((state) => {
    const nextState = {
      ...state,
      members,
    };
    persistTeamState(nextState);
    return nextState;
  }),

  addMember: (member) =>
  set((state) => {
    const nextState = {
      ...state,
      members: [...state.members, member],
    };
    persistTeamState(nextState);
    return nextState;
  }),

  updateMember: (updatedMember) =>
  set((state) => {
    const nextState = {
      ...state,
      members: state.members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      ),
    };
    persistTeamState(nextState);
    return nextState;
  }),

  deleteMember: (id) =>
  set((state) => {
    const nextState = {
      ...state,
      members: state.members.filter((member) => member.id !== id),
    };
    persistTeamState(nextState);
    return nextState;
  }),

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

  addActivity: (
    memberId,
    activity
  ) =>
  set((state) => {
    const resolvedMemberId =
      resolveMemberId(state.members, memberId) || state.members[0]?.id;

    if (!resolvedMemberId) {
      return state;
    }

    const fullActivity: TeamActivity = {
      id: activity.id || crypto.randomUUID(),
      action: activity.action,
      recruiterName:activity.recruiterName,
      target: activity.target,
      secondaryTarget: activity.secondaryTarget,
      date: activity.date || new Date().toISOString(),
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



clearMembers: () =>
 set(() => {
 localStorage.removeItem("teamMembers");

 return {
 members: [],
 selectedMemberId: null,
 };
 }),




}));
*/

import { create } from "zustand";
import type { TeamMember, TeamActivity, TeamInvitation, TeamRole } from "../types/team";
import { teamMembers } from "../data/team";
import { useCompanyStore } from "./companyStore";

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

 createInvitation: (data: InviteMemberData) => string;
 // -----------------------------
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

 // =====================================
 // DELETE MEMBER
 // =====================================
/*
 deleteMember: (id) =>
 set((state) => {
 const nextState = {
 ...state,

 members: state.members.filter(
 (member) => member.id !== id
 ),

 selectedMemberId:
 state.selectedMemberId === id
 ? null
 : state.selectedMemberId,
 };

 persistTeamState(nextState);

 return nextState;
 }),
*/

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


 createInvitation: ({
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

 const newMember: TeamMember = {
 id: crypto.randomUUID(),

 companyId,
 invitationId,

 fullName: fullName.trim(),
 email: email.trim().toLowerCase(),

 phone: "",
 avatar: "",

 companyName: company?.companyName ?? "",

 role,
 department: "",

 membershipStatus: "Pending",

 presenceStatus: "Offline",
 lastActive: undefined,

 assignedJobIds: [],

 candidatesHandled: 0,
 interviewsThisWeek: 0,
 offersMade: 0,
 successfulHires: 0,
 averageHiringDays: 0,
 performanceScore: 0,

 recentActivity: [],

 invitedAt: now,
 joinedAt: undefined,

 createdAt: now,
 };

 set((state) => {
 const nextState = {
 ...state,

 invitations: [
 ...state.invitations,
 invitation,
 ],

 members: [
 ...state.members,
 newMember,
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