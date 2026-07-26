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