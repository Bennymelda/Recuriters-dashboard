import { create } from "zustand";
import type { Company } from "../types/company";

const STORAGE_KEY = "careerflow-company";

const defaultCompany: Company = {
 id: crypto.randomUUID(),
 companyName: "CareerFlow Technologies",
 logo: "",
 industry: "Technology",
 companySize: "11-50 Employees",
 website: "",
 email: "",
 phone: "",
 address: "",
};

interface CompanyStore {
 company: Company;

 updateCompany: (
 company: Partial<Company>
 ) => void;
 resetCompany: () => void;
 initializeCompany: (company: Company) => void;
}

const loadCompany = (): Company => {
 if (typeof window === "undefined") {
 return defaultCompany;
 }

 const stored = localStorage.getItem(STORAGE_KEY);

 if (!stored) {
 return defaultCompany;
 }

 return JSON.parse(stored);
};

export const useCompanyStore = create<CompanyStore>(
 (set) => ({
 company: loadCompany(),

 updateCompany: (data) =>
 set((state) => {
 const updatedCompany = {
 ...state.company,
 ...data,
 };

 localStorage.setItem(
 STORAGE_KEY,
 JSON.stringify(updatedCompany)
 );

 return {
 company: updatedCompany,
 };
 }),



initializeCompany: (company) =>
 set(() => {
 localStorage.setItem(
 STORAGE_KEY,
 JSON.stringify(company)
 );

 return {
 company,
 };
 }),


 
 resetCompany: () =>
 set((state) => {
 localStorage.removeItem("company");

 return {
    ...state,
 company: {
    id:"",
 companyName: "",
 industry: "",

 companySize: "",
 website: "",
 email: "",
 phone: "",
 address: "",
 logo: "",
 },
 };
 }),
 })
);