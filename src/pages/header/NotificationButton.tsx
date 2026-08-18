import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../../store/notificationStore";

const NotificationButton = () => {
 const [openNotifications, setOpenNotifications] = useState(false);
const unreadCount = useNotificationStore(
 (state) => state.notifications.filter((n) => !n.read).length
);
 const {
 notifications,
 markAsRead,
 markAllAsRead,
 } = useNotificationStore();


 return (
 <div className="relative">
 {/* Notification Button */}
 <button
 onClick={() => setOpenNotifications((prev) => !prev)}
 className="
 relative
 
 
 p-3

 transition-all
 duration-300
 hover:-translate-y-0.5
 hover:border-[#408A71]/30
 hover:bg-[#EEF8F3]
cursor-pointer
 
 dark:hover:border-[#B0E4CC]/30
 dark:hover:bg-zinc-700
 "
 >
 <MdNotificationsNone
 size={25}
 className="text-zinc-700 dark:text-zinc-300"
 />

 {unreadCount > 0 && (
 <span className="absolute right-2 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#285A48] dark:bg-[#B0E4CC]  text-[10px] font-bold text-white dark:text-black shadow-lg">
 {unreadCount}
 </span>
 )}
 </button>

 {/* Dropdown */}
 {openNotifications && (
 <div
 className="
 absolute
 right-0
 mt-3
 w-96
 overflow-hidden

 rounded-3xl

 border
 border-zinc-200

 bg-white

 shadow-2xl

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
 <div>
 <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
 Notifications
 </h3>

 <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
 {unreadCount} unread notification
 {unreadCount !== 1 ? "s" : ""}
 </p>
 </div>

 {notifications.length > 0 && (
 <button
 onClick={markAllAsRead}
 className="rounded-lg px-3 py-2 text-xs font-semibold text-[#408A71] transition hover:bg-[#EEF8F3] dark:hover:bg-[#408A71]/15"
 >
 Mark all
 </button>
 )}
 </div>

 {/* Notification List */}
 <div className="max-h-96 overflow-y-auto">
 {notifications.length === 0 ? (
 <div className="flex flex-col items-center justify-center py-12">
 <MdNotificationsNone
 size={42}
 className="text-zinc-300 dark:text-zinc-600"
 />

 <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
 You're all caught up.
 </p>
 </div>
 ) : (
 notifications.map((notification) => (
 <button
 key={notification.id}
onClick={() => {
 markAsRead(notification.id);
 setOpenNotifications(false);
}}
 className={`
 group
 flex
 w-full
 items-start
 gap-3

 border-b
 border-zinc-100

 px-5
 py-4

 text-left

 transition-all
 duration-200

 hover:bg-zinc-50

 dark:border-zinc-800
 dark:hover:bg-zinc-800/70

 ${
 !notification.read
 ? "bg-[#EEF8F3] dark:bg-[#408A71]/10"
 : ""
 }
 `}
 >
 {/* Dot */}
 <div
 className={`
 mt-2
 h-2.5
 w-2.5
 rounded-full

 ${
 !notification.read
 ? "bg-[#408A71]"
 : "bg-zinc-300 dark:bg-zinc-600"
 }
 `}
 />

 <div className="flex-1">
 <p className="font-medium text-zinc-900 dark:text-zinc-100">
 {notification.title}
 </p>

 <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
 {notification.message}
 </p>

 <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
 {new Date(notification.createdAt).toLocaleString()}
</p>
 </div>
 </button>
 ))
 )}
 </div>

 {/* Footer */}
 <Link
 to="/notifications"
 onClick={() => setOpenNotifications(false)}
 className="
 flex
 items-center
 justify-center
 gap-2

 border-t
 border-zinc-200

 py-4

 text-sm
 font-semibold

 text-[#408A71]

 transition-all
 duration-300

 hover:bg-[#EEF8F3]

 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 View Notification Center

 <span className="transition-transform group-hover:translate-x-1">
 →
 </span>
 </Link>
 </div>
 )}
</div>
 );
};

export default NotificationButton;