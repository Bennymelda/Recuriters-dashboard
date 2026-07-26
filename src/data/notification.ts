import type { Notification } from "../types/notification";

export const notifications: Notification[] = [
 {
 id: "1",
 title: "New Application",
 message: "John Doe applied for Frontend Developer.",
 read: false,
 createdAt: "2 min ago",
 },
 {
 id: "2",
 title: "Interview Scheduled",
 message: "Interview with Sarah Johnson is tomorrow.",
 read: false,
 createdAt: "1 hour ago",
 },
 {
 id: "3",
 title: "Job Published",
 message: "Backend Developer job is now live.",
 read: true,
 createdAt: "Yesterday",
 },
];