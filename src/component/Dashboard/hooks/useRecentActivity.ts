import { useTeamStore } from "../../../store/teamStore";

export interface DashboardActivity {
  id: string;
  recruiterName: string;
  action: string;
  target: string;
  secondaryTarget?: string;
  date: string;
  createdAt?: string;
  category?: "interview" | "pipeline" | "job" | "team" | "candidate";
}

const useRecentHiringActivity = () => {
  const members = useTeamStore((state) => state.members);

  const activities: DashboardActivity[] = members
    .flatMap((member) =>
      member.recentActivity.map((activity) => ({
        ...activity,
        recruiterName:
          activity.recruiterName?.trim() ||
          member.fullName?.trim() ||
          "Unknown",
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return {
    activities,
  };
};

export default useRecentHiringActivity;