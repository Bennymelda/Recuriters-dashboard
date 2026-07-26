import { create } from "zustand";

export type NotificationType =
 | "candidate"
 | "interview"
 | "job"
 | "team"
 | "company"
 | "security"
 | "system";

export interface Notification {
 id: string;
 title: string;
 message: string;
 type: NotificationType;
 read: boolean;
 createdAt: string;
 link?: string;
}

interface NotificationStore {
 notifications: Notification[];

 addNotification: (
 notification: Omit<Notification, "id" | "createdAt" | "read">
 ) => void;

 markAsRead: (id: string) => void;

 markAllAsRead: () => void;

 deleteNotification: (id: string) => void;

 clearNotifications: () => void;

 unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
 notifications: [],

 addNotification: (notification) => {
 console.log("ADDING NOTIFICATION:", notification);

 set((state) => ({
 notifications: [
 {
 id: crypto.randomUUID(),
 createdAt: new Date().toISOString(),
 read: false,
 ...notification,
 },
 ...state.notifications,
 ],
 }));
},

 markAsRead: (id) =>
 set((state) => ({
 notifications: state.notifications.map((notification) =>
 notification.id === id
 ? { ...notification, read: true }
 : notification
 ),
 })),

 markAllAsRead: () =>
 set((state) => ({
 notifications: state.notifications.map((notification) => ({
 ...notification,
 read: true,
 })),
 })),

 deleteNotification: (id) =>
 set((state) => ({
 notifications: state.notifications.filter(
 (notification) => notification.id !== id
 ),
 })),

 clearNotifications: () =>
 set({
 notifications: [],
 }),

 unreadCount: () =>
 get().notifications.filter((notification) => !notification.read).length,
}));