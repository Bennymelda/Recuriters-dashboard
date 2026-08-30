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

 initializeCompany: (
 company: Company
 ) => void;
}

const loadCompany = (): Company => {
 if (typeof window === "undefined") {
 return defaultCompany;
 }

 const stored = localStorage.getItem(
 STORAGE_KEY
 );

 if (!stored) {
 return defaultCompany;
 }

 try {
 return JSON.parse(stored);
 } catch {
 return defaultCompany;
 }
};

export const useCompanyStore =
 create<CompanyStore>((set) => ({
 company: loadCompany(),

 // ---------------------------------------------
 // UPDATE COMPANY
 // ---------------------------------------------

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

 // ---------------------------------------------
 // INITIALIZE COMPANY
 // ---------------------------------------------

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

 // ---------------------------------------------
 // RESET COMPANY
 // ---------------------------------------------

 resetCompany: () =>
 set(() => {
 localStorage.removeItem(
 STORAGE_KEY
 );

 return {
 company: {
 id: "",
 companyName: "",
 logo: "",
 industry: "",
 companySize: "",
 website: "",
 email: "",
 phone: "",
 address: "",
 },
 };
 }),
 }));