

import { useEffect, useState } from "react";
import { useCandidateStore } from "../../../store/candidateStore";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import type { Job } from "../../../types/job";
import { useToastStore } from "../../toast/toastStore";

export default function JobApplicationForm(){
 const { jobId } = useParams();

    const addCandidate = useCandidateStore(
     (state) => state.addCandidate
    );
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [experience, setExperience] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [cv, setCv] = useState<File | null>(null);
    const [location, setLocation] = useState("");
    
    const [isSubmitting, setIsSubmitting] = useState(false);
   const showToast = useToastStore(
   (state) => state.showToast
   );


const uploadCV = async (file: File) => {
 console.log("Starting CV upload:", file.name, file.type, file.size);

 const formData = new FormData();

 formData.append("file", file);

 formData.append(
 "upload_preset",
 "careerflow_cv"
 );

 const response = await fetch(
 "https://api.cloudinary.com/v1_1/xs1osb7m/raw/upload",
 {
 method: "POST",
 body: formData,
 }
 );

 console.log("Cloudinary response status:", response.status);

 if (!response.ok) {
 const errorData = await response.text();

 console.error("Cloudinary error:", errorData);

 throw new Error("CV upload failed.");
 }

 const data = await response.json();

 console.log("CV uploaded successfully:", data);

 return data.secure_url;
};
const [job, setJob] = useState<Job | null>(null);
const [loadingJob, setLoadingJob] = useState(true);

useEffect(() => {
 const fetchJob = async () => {
 if (!jobId) {
 setLoadingJob(false);
 return;
 }

 try {
 const jobRef = doc(db, "jobs", jobId);
 const jobSnap = await getDoc(jobRef);

 if (jobSnap.exists()) {
 setJob({
 ...(jobSnap.data() as Job),
 id: jobSnap.id,
 });
 } else {
 setJob(null);
 }
 } catch (error) {
 console.error("Failed to fetch job:", error);
 setJob(null);
 } finally {
 setLoadingJob(false);
 }
 };

 fetchJob();
}, [jobId]);

if (loadingJob) {
 return (
 <div className="flex min-h-screen items-center justify-center">
 <p className="text-sm text-zinc-500">
 Loading job...
 </p>
 </div>
 );
}

 if (!job) {
 return (
 <div>
 <h1>Job Not Found</h1>
 <p>
 This job may no longer be available.
 </p>
 </div>
 );
 }
const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 if (isSubmitting) return;

 // -----------------------------
 // VALIDATION
 // -----------------------------

 if (!fullName.trim()) {
 
 showToast({
 type: "warning",
 title: "Full Name required",
 message: "Please enter your fullName.",
 });
 return;
 }

 if (!email.trim()) {
 
  showToast({
 type: "warning",
 title: "Email required",
 message: "Please enter your email.",
 });
 return;
 }

 if (!phone.trim()) {
    showToast({
 type: "warning",
 title: "Phone number required",
 message: "Please enter your phone number.",
 });

 return;
 }

 if (!location.trim()) {

 showToast({
 type: "warning",
 title: "Location required",
 message: "Please enter your location.",
 });
 return;
 }

 if (!cv) {
    showToast({
 type: "warning",
 title: "CV required",
 message: "Please upload your CV.",
 });
 
 return;
 }

 // -----------------------------
 // START SUBMISSION
 // -----------------------------

 setIsSubmitting(true);

 try {
 console.log("About to upload CV");

 const resumeUrl = await uploadCV(cv);


 const now = new Date().toISOString();

 const newCandidate = {
 id: crypto.randomUUID(),

 fullName: fullName.trim(),

 email: email.trim().toLowerCase(),

 phone: phone.trim(),

 location: location.trim(),

 jobId: job.id,

 department: job.department as
 | "Engineering"
 | "Design"
 | "Marketing"
 | "Human Resources",

 appliedRole: job.title,

 status: "Applied" as const,

 experience: job.experienceLevel,

 bio: coverLetter.trim(),

 skills: job.skills,

 education: "",

 yearsOfExperience:
 Number(experience) || 0,

 resumeUrl,

 linkedin:
 linkedin.trim() || undefined,

 portfolio:
 portfolio.trim() || undefined,

 interviewHistory: [],

 notes: [],

 source: "Company Website" as const,

 stageUpdatedAt: now,

 createdAt: now,

 updatedAt: now,
 };

 await addCandidate(newCandidate);

showToast({
 type: "success",
 title: "Job Application",
 message: "Your application has been submitted successfully!",
 });


// Clear form
setFullName("");
setEmail("");
setPhone("");
setLocation("");
setCv(null);
setCoverLetter("");
setExperience("");
setLinkedin("");
setPortfolio("");




 } catch (error) {
 console.error(
 "Application submission error:",
 error
 );


showToast({
 type: "error",
 title: "Job application failed",
 message: "We couldn't submit your application. Please try again.",
 });
 } finally {
 setIsSubmitting(false);
 }
};



    return(<>
    

<div className="mx-auto mt-6 px-4 bg-white shadow-sm w-full max-w-4xl rounded-2xl ...">
  {/* Header */}
  <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
      Apply for {job.title}
    </h2>

    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
      Please provide your information below.
    </p>
  </div>

  <form onSubmit={handleSubmit} className="mt-8 space-y-7">

    {/* Personal Information */}
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
        Personal Information
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08012345678"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enugu, Nigeria"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

      </div>
    </div>


    {/* Professional Information */}
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
        Professional Information
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            LinkedIn Profile
          </label>

          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Portfolio Website
          </label>

          <input
            type="url"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://yourportfolio.com"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Years of Experience
          </label>

          <input
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="2"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
          />
        </div>

        {/* CV */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            CV / Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files?.[0] || null)}
            className="mt-2 block w-full cursor-pointer rounded-xl border border-zinc-300 bg-transparent text-sm text-zinc-500 file:mr-4 file:border-0 file:bg-zinc-100 file:px-4 file:py-3 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-400 dark:file:bg-zinc-800 dark:file:text-zinc-200"
          />
        </div>

      </div>
    </div>


    {/* Cover Letter */}
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Cover Letter
      </label>

      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        rows={6}
        placeholder="Tell us why you're a good fit for this role..."
        className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#285A48] focus:ring-2 focus:ring-[#285A48]/10 dark:border-zinc-700 dark:text-white"
      />
    </div>


    {/* Submit */}
    <div className="flex justify-end border-t border-zinc-200 pt-6 dark:border-zinc-800">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-[#285A48] px-7 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </div>

  </form>
</div>



    </>)
}