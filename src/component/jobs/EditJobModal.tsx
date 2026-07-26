
import BasicInfoSection from "./JobForm/BasicInfoSection";
import ListInputSection from "./JobForm/ListInputSection";
import SkillsSection from "./JobForm/SkillsSection";
import FormFooter from "./JobForm/FormFotter";
import DescriptionSection from "./JobForm/DesriptionSection";
import { useState, useEffect } from "react";
import type { Job } from "../../types/job";
import { useJobStore } from "../../store/jobStore";
import { MdWork } from "react-icons/md";
import { useToastStore } from "../toast/toastStore";
interface JobFormProps {
 mode: "create" | "edit";
 onClose: () => void;
 job: Job; // Optional job prop for editing
}
const EditJobForm = ({ mode, onClose, job }: JobFormProps) => {
const [title, setTitle] = useState(job?.title ?? "");
const [department, setDepartment] = useState(job?.department ?? "");
const [location, setLocation] = useState(job?.location ?? "");
const [employmentType, setEmploymentType] =
 useState<Job["employmentType"]>(job?.employmentType ?? "Full-time");

const [experienceLevel, setExperienceLevel] =
 useState<Job["experienceLevel"]>(job?.experienceLevel ?? "Junior");

const [status, setStatus] =
 useState<Job["status"]>(job?.status ?? "Draft");

const [salary, setSalary] = useState(job?.salary ?? "");
const [description, setDescription] = useState(job?.description ?? "");

const [responsibilities, setResponsibilities] =
 useState(job?.responsibilities ?? []);
const showToast = useToastStore((state) => state.showToast);
const [requirements, setRequirements] =
 useState(job?.requirements ?? []);

const [benefits, setBenefits] =
 useState(job?.benefits ?? []);

const [skills, setSkills] =
 useState(job?.skills ?? []);
const { addJob, updateJob } = useJobStore();
const [, forceUpdate] = useState(0);

useEffect(() => {
 const interval = setInterval(() => {
 forceUpdate((prev) => prev + 1);
 }, 60000); // Re-render every minute

 return () => clearInterval(interval);
}, []);
const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();

 if (!title.trim()) return;

 const jobData = {
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



  if (mode === "create") {
 addJob({
 id: crypto.randomUUID(),
 ...jobData,
 });

 showToast({
 type: "success",
 title: "Job Created",
 message: `${title} has been created successfully.`,
 });
 } else {
 updateJob(job.id, jobData);

 showToast({
 type: "success",
 title: "Job Updated",
 message: `${title} has been updated successfully.`,
 });
 }
 console.log("Job Created", job);

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
 
export default EditJobForm;