import { create } from "zustand";
import type {
 User,
 SignupPayload,
 LoginPayload,
 UserRole,
} from "../types/auth";
import { persist } from "zustand/middleware";

interface AuthStore {
 user: User | null;
 isAuthenticated: boolean;
setRole: (role: UserRole) => void;
 signup: (data: SignupPayload) => void;
 login: (data: LoginPayload) => {
    success:boolean;
    
    
    message:string;
 }
 updateNotificationSettings: (
 notifications: User["notifications"]
) => void;
 logout: () => void;
 updateProfile: (
 data: {
 fullName: string;
 companyName: string;
 phoneNumber: string;
 jobTitle: string;
 department: string;
 bio: string;
 location: string;
 timeZone: string;
 avatar?: string;
 }
) => void;

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


 signup: (data) => {
 const newUser: User = {
 id: crypto.randomUUID(),
 fullName: data.fullName,
 email: data.email,
 password: data.password,
 companyName: data.companyName,
 role: data.role || "Admin",
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

 // Get existing users
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 // Prevent duplicate accounts
 const existingUser = users.find(
 (user) => user.email === newUser.email
 );

 if (existingUser) {
 return {
 success: false,
 message: "An account with this email already exists.",
 };
 }

 // Save new user
 users.push(newUser);

 localStorage.setItem(
 "users",
 JSON.stringify(users)
 );

 // Log the user in immediately
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
login: (data) => {
 const users = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const user = users.find(
 (u: User) =>
 u.email === data.email &&
 u.password === data.password
 );

 if (!user) {
 return {
 success: false,
 message: "Invalid email or password",
 };
 }

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
 message: "Login successful",
 };
},


logout: () => {
 localStorage.removeItem("currentUser");

 set({
 user: null,
 isAuthenticated: false,
 });
},


 setRole: (role) => {
 set((state) => {
 if (!state.user) {
 return state;
 }

 const updatedUser = {
 ...state.user,
 role,
 };

 // Update current logged-in user
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 // Update the user inside the users array
 const users: User[] = JSON.parse(
 localStorage.getItem("users") || "[]"
 );

 const updatedUsers = users.map((user) =>
 user.id === updatedUser.id ? updatedUser : user
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

updateProfile: (data) =>
 set((state) => {
 if (!state.user) {
 return state;
 }

const updatedUser = {
 ...state.user,
 fullName: data.fullName,
 companyName: data.companyName,
 phoneNumber: data.phoneNumber,
 jobTitle: data.jobTitle,
 department: data.department,
 bio: data.bio,
 location: data.location,
 timeZone: data.timeZone,
 avatar: data.avatar ?? state.user.avatar,
};



 // Update current user
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 // Update registered users
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

 if (state.user.password !== currentPassword) {
 return {
 success: false,
 message: "Current password is incorrect.",
 };
 }

 if (newPassword !== confirmPassword) {
 return {
 success: false,
 message: "Passwords do not match.",
 };
 }

 if (newPassword.length < 8) {
 return {
 success: false,
 message: "Password must be at least 8 characters.",
 };
 }

 const updatedUser = {
 ...state.user,
 password: newPassword,
 };

 // Update current user
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 // Update users array
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
 message: "Password updated successfully.",
 };
},

updateNotificationSettings: (notifications) =>
 set((state) => {
 if (!state.user) {
 return state;
 }

 const updatedUser = {
 ...state.user,
 notifications,
 };

 // Update current user
 localStorage.setItem(
 "currentUser",
 JSON.stringify(updatedUser)
 );

 // Update registered users
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

