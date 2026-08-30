import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
 User,
 SignupPayload,
 LoginPayload,
 UserRole,
} from "../types/auth";

interface AuthStore {
 user: User | null;
 isAuthenticated: boolean;

 setRole: (role: UserRole) => void;

 signup: (
 data: SignupPayload
 ) => {
 success: boolean;
 message: string;
 };

 login: (data: LoginPayload) => {
 success: boolean;
 message: string;
 };

 updateNotificationSettings: (
 notifications: User["notifications"]
 ) => void;

 logout: () => void;

 updateProfile: (data: {
 fullName: string;
 companyName: string;
 phoneNumber: string;
 jobTitle: string;
 department: string;
 bio: string;
 location: string;
 timeZone: string;
 avatar?: string;
 }) => void;

 updatePassword: (
 currentPassword: string,
 newPassword: string,
 confirmPassword: string
 ) => {
 success: boolean;
 message: string;
 };
}

export const useAuthStore = create<AuthStore>()(
 persist(
 (set) => ({
 user: null,

 isAuthenticated: false,

 // ---------------------------------------------
 // SIGN UP
 // ---------------------------------------------

 signup: (data) => {
 /*
 * Get existing users.
 */
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 /*
 * Prevent duplicate accounts.
 */
 const existingUser = users.find(
 (user) =>
 user.email.toLowerCase() ===
 data.email.toLowerCase()
 );

 if (existingUser) {
 return {
 success: false,
 message:
 "An account with this email already exists.",
 };
 }

 /*
 * If companyId is provided, this is an invited
 * team member joining an existing company.
 *
 * If companyId is NOT provided, this is the
 * person creating a new company.
 */
 const isInvitedUser = Boolean(data.companyId);

 /*
 * Admin creates a new company.
 *
 * Invited users already have a companyId.
 */
 const companyId =
 data.companyId || crypto.randomUUID();

 const companyName =
 data.companyName?.trim() || "";

 /*
 * Normal signup = Admin.
 *
 * Invited signup = role supplied by invitation.
 */
 const role: UserRole =
 data.role ||
 (isInvitedUser
 ? "Recruiter"
 : "Admin");

 const newUser: User = {
 id: crypto.randomUUID(),

 companyId,

 fullName: data.fullName.trim(),

 email: data.email.trim(),

 password: data.password,

 companyName,

 role,

 createdAt: new Date().toISOString(),

 notifications: {
 interviewReminder30: true,
 interviewReminder5: true,
 jobAssigned: true,
 teamMemberAdded: true,
 teamMemberRemoved: true,
 roleChanged: true,
 },
 };

 /*
 * Save the new user.
 */
 users.push(newUser);

 localStorage.setItem(
 "users",
 JSON.stringify(users)
 );

 /*
 * Log the user in immediately.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(newUser)
 );

 set({
 user: newUser,
 isAuthenticated: true,
 });

 return {
 success: true,
 message: "Account created successfully.",
 };
 },

 // ---------------------------------------------
 // LOGIN
 // ---------------------------------------------

 login: (data) => {
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const user = users.find(
 (u: User) =>
 u.email.toLowerCase() ===
 data.email.toLowerCase() &&
 u.password === data.password
 );

 if (!user) {
 return {
 success: false,
 message: "Invalid email or password.",
 };
 }

 /*
 * Save the currently logged-in user.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(user)
 );

 set({
 user,
 isAuthenticated: true,
 });

 return {
 success: true,
 message: "Login successful.",
 };
 },

 // ---------------------------------------------
 // LOGOUT
 // ---------------------------------------------

 logout: () => {
 localStorage.removeItem("currentUser");

 set({
 user: null,
 isAuthenticated: false,
 });
 },

 // ---------------------------------------------
 // SET ROLE
 // ---------------------------------------------

 setRole: (role) => {
 set((state) => {
 if (!state.user) {
 return state;
 }

 const updatedUser: User = {
 ...state.user,
 role,
 };

 /*
 * Update current logged-in user.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 /*
 * Update the user inside users array.
 */
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const updatedUsers = users.map((user) =>
 user.id === updatedUser.id
 ? updatedUser
 : user
 );

 localStorage.setItem(
 "users",
 JSON.stringify(updatedUsers)
 );

 return {
 ...state,
 user: updatedUser,
 };
 });
 },

 // ---------------------------------------------
 // UPDATE PROFILE
 // ---------------------------------------------

 updateProfile: (data) =>
 set((state) => {
 if (!state.user) {
 return state;
 }

 const updatedUser: User = {
 ...state.user,

 fullName: data.fullName,

 /*
 * Company name can still be updated from
 * the user's profile for now.
 *
 * We can later restrict company editing
 * to Admin only.
 */
 companyName: data.companyName,

 phoneNumber: data.phoneNumber,

 jobTitle: data.jobTitle,

 department: data.department,

 bio: data.bio,

 location: data.location,

 timeZone: data.timeZone,

 avatar:
 data.avatar ?? state.user.avatar,
 };

 /*
 * Update current user.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 /*
 * Update registered users.
 */
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const updatedUsers = users.map((user) =>
 user.id === updatedUser.id
 ? updatedUser
 : user
 );

 localStorage.setItem(
 "users",
 JSON.stringify(updatedUsers)
 );

 return {
 ...state,
 user: updatedUser,
 };
 }),

 // ---------------------------------------------
 // UPDATE PASSWORD
 // ---------------------------------------------

 updatePassword: (
 currentPassword,
 newPassword,
 confirmPassword
 ) => {
 const state = useAuthStore.getState();

 if (!state.user) {
 return {
 success: false,
 message: "User not found.",
 };
 }

 if (
 state.user.password !==
 currentPassword
 ) {
 return {
 success: false,
 message:
 "Current password is incorrect.",
 };
 }

 if (
 newPassword !==
 confirmPassword
 ) {
 return {
 success: false,
 message:
 "Passwords do not match.",
 };
 }

 if (newPassword.length < 8) {
 return {
 success: false,
 message:
 "Password must be at least 8 characters.",
 };
 }

 const updatedUser: User = {
 ...state.user,
 password: newPassword,
 };

 /*
 * Update current user.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 /*
 * Update users array.
 */
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const updatedUsers = users.map((user) =>
 user.id === updatedUser.id
 ? updatedUser
 : user
 );

 localStorage.setItem(
 "users",
 JSON.stringify(updatedUsers)
 );

 useAuthStore.setState({
 user: updatedUser,
 });

 return {
 success: true,
 message:
 "Password updated successfully.",
 };
 },

 // ---------------------------------------------
 // NOTIFICATION SETTINGS
 // ---------------------------------------------

 updateNotificationSettings: (
 notifications
 ) =>
 set((state) => {
 if (!state.user) {
 return state;
 }

 const updatedUser: User = {
 ...state.user,
 notifications,
 };

 /*
 * Update current user.
 */
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 /*
 * Update registered users.
 */
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const updatedUsers = users.map((user) =>
 user.id === updatedUser.id
 ? updatedUser
 : user
 );

 localStorage.setItem(
 "users",
 JSON.stringify(updatedUsers)
 );

 return {
 ...state,
 user: updatedUser,
 };
 }),
 }),

 {
 name: "auth-storage",
 }
 )
);