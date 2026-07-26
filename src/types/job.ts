//import type { IconType } from "react-icons";

export interface Job {
 id: string;
  name: string;
 icon: string;
 iconColor:string;

 title: string;
 darkIcon?:string;
 department: string;
 location: string;
 employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
 experienceLevel: "Junior" | "Mid" | "Senior";
 status: "Active" | "Draft" | "Closed";
 experience:string;
 description: string;
 responsibilities: string[];
 requirements: string[];
 benefits: string[];
 skills: string[];

 salary: string;

 

 createdAt: string;
}