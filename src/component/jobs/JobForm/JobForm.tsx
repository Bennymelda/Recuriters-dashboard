
import BasicInfoSection from "./BasicInfoSection";
import ListInputSection from "./ListInputSection";
import SkillsSection from "./SkillsSection";
import FormFooter from "./FormFotter";
import DescriptionSection from "./DesriptionSection";
import { useState } from "react";
import type { Job } from "../../../types/job";
import { useJobStore } from "../../../store/jobStore";
import { MdWork } from "react-icons/md";
import { useToastStore } from "../../toast/toastStore";
interface JobFormProps {
 mode: "create" | "edit";
 onClose: () => void;
}

const JobForm = ({ mode, onClose }: JobFormProps) => {
const showToast = useToastStore((state) => state.showToast);
   const [responsibilities, setResponsibilities] = useState<string[]>([]);
const [requirements, setRequirements] = useState<string[]>([]);
const [benefits, setBenefits] = useState<string[]>([]);
const [skills, setSkills] = useState<string[]>([]);
const [title, setTitle] = useState("");
const [department, setDepartment] = useState("");
const [location, setLocation] = useState("");
const [employmentType, setEmploymentType] =
 useState<Job["employmentType"]>("Full-time");

const [experienceLevel, setExperienceLevel] =
 useState<Job["experienceLevel"]>("Junior");

const [status, setStatus] =
 useState<Job["status"]>("Draft");
const [salary, setSalary] = useState("");
const [description, setDescription] = useState("");
const { addJob} = useJobStore();

const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();

 if (!title.trim()) {
 showToast({
 type: "warning",
 title: "Job title required",
 message: "Please enter a job title.",
 });

 return;
}

if (!department.trim()) {
 showToast({
 type: "warning",
 title: "Department required",
 message: "Please select a department.",
 });

 return;
}

if (!location.trim()) {
 showToast({
 type: "warning",
 title: "Location required",
 message: "Please enter a location.",
 });

 return;
}

if (!description.trim()) {
 showToast({
 type: "warning",
 title: "Description required",
 message: "Please provide a job description.",
 });

 return;
}
 const jobData= {
 id: crypto.randomUUID(),
    name: title,
    icon: MdWork,
    iconColor: "#408A71",
 title,
 department,
 location,
 employmentType,
    experienceLevel,
    experience: experienceLevel,
 status,
 description,
 responsibilities,
 requirements,
 benefits,
 skills,
 salary,
 applicantsCount: 0,
 createdAt: new Date().toISOString(),
 };

 addJob(jobData);
console.log(localStorage.getItem("careerflow-jobs"));
 showToast({
 type: "success",
 title: "Job Created",
 message: `${title} has been created successfully.`,
});
 // Reset form
 setTitle("");
 setDepartment("");
 setLocation("");
 setEmploymentType("Full-time");
 setExperienceLevel("Junior");
 setStatus("Draft");
 setSalary("");
 setDescription("");
 setResponsibilities([]);
 setRequirements([]);
 setBenefits([]);
 setSkills([]);
 onClose();
};



    return ( <>
    <form onSubmit={handleSubmit}>
 <BasicInfoSection
 title={title}
 setTitle={setTitle}
 department={department}
 setDepartment={setDepartment}
 location={location}
 setLocation={setLocation}
 employmentType={employmentType}
 setEmploymentType={setEmploymentType}
 experienceLevel={experienceLevel}
 setExperienceLevel={setExperienceLevel}
 status={status}
 setStatus={setStatus}
 salary={salary}
 setSalary={setSalary}
/>
 <DescriptionSection
 description={description}
 setDescription={setDescription}
/>
 <ListInputSection
 title="Responsibilities"
 placeholder="Add a responsibility..."
 items={responsibilities}
 setItems={setResponsibilities}
 />

 <ListInputSection
 title="Requirements"
 placeholder="Add a requirement..."
 items={requirements}
 setItems={setRequirements}
 />

 <ListInputSection
 title="Benefits"
 placeholder="Add a benefit..."
 items={benefits}
 setItems={setBenefits}
 />

 <SkillsSection
 skills={skills}
 setSkills={setSkills}
 />

 <FormFooter
 mode={mode}
 loading={false}
 onCancel={onClose}
/>
</form>
    </> );
}
 
export default JobForm;