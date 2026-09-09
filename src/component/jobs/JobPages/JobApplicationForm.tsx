

import { useEffect, useState } from "react";
import { useCandidateStore } from "../../../store/candidateStore";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import type { Job } from "../../../types/job";

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
    /*
    const uploadCV = async (file: File) => {
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
    
     if (!response.ok) {
     throw new Error("CV upload failed.");
     }
    
     const data = await response.json();
    
     return data.secure_url;
    };
*/

    


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
 alert("Please enter your full name.");
 return;
 }

 if (!email.trim()) {
 alert("Please enter your email.");
 return;
 }

 if (!phone.trim()) {
 alert("Please enter your phone number.");
 return;
 }

 if (!location.trim()) {
 alert("Please enter your location.");
 return;
 }

 if (!cv) {
 alert("Please upload your CV.");
 return;
 }

 // -----------------------------
 // START SUBMISSION
 // -----------------------------

 setIsSubmitting(true);

 try {
 console.log("About to upload CV");

 const resumeUrl = await uploadCV(cv);

 console.log(
 "CV upload finished. URL:",
 resumeUrl
 );

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

 alert(
 "Your application has been submitted successfully!"
 );



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

 alert(
 "We couldn't submit your application. Please try again."
 );

 } finally {
 setIsSubmitting(false);
 }
};



    return(<>
    
 <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">

 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
 Apply for {job.title}
 </h2>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Please provide your information below.
 </p>

 <form
 onSubmit={handleSubmit}
 className="mt-8 space-y-6"
>
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
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
 onChange={(e) =>
 setCv(e.target.files?.[0] || null)
 }
 className="mt-2 block w-full text-sm text-zinc-500"
 />
 </div>

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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
 />
 </div>

<div>
 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
 Location
 </label>

 <input
 type="text"
 value={location}
 onChange={(e) => setLocation(e.target.value)}
 placeholder="Enugu, Nigeria"
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
 />
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
 className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-[hashtag#285A48] dark:border-zinc-700 dark:text-white"
 />
 </div>

 <button
  type="submit"
 disabled={isSubmitting}
 className="
 w-full
 rounded-xl
 bg-[#285A48]
 px-6
 py-3
 font-semibold
 text-white
 transition
 hover:opacity-90
 disabled:cursor-not-allowed
 disabled:opacity-60
 "
>
 {isSubmitting ? "submitting..." : "Submit Application"}
</button>


 </form>
 </div>

    </>)
}