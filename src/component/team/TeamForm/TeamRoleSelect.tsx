import CustomSelect from "../../ui/CustomSelect";

interface TeamRoleSelectProps {
 role: string;
 setRole: (value: string) => void;
}

const TeamRoleSelect = ({
 role,
 setRole,
}: TeamRoleSelectProps) => {
 return (
 <CustomSelect
 placeholder="Select Role"
 value={role}
 options={[
 "Recruiter",
 "Hiring Manager",
 "HR Manager",
 "Interviewer",
 "Admin",
 ]}
	onChange={setRole}
 />
 );
};

export default TeamRoleSelect;