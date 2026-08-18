import type { Notification } from "../../types/notification";

interface NotificationCardProps {
 notification: Notification;
 onRead: () => void;
}

const NotificationCard = ({
 notification,
 onRead,
}: NotificationCardProps) => {
 return (
 <button
 onClick={onRead}
 className={`
 flex
 w-full
 items-start
 gap-4
 rounded-2xl
 border
 p-5
 text-left
 transition
cursor-pointer
 ${
 !notification.read
 ? "bg-[#EEF8F3] border-[#408A71]/30"
 : "bg-white border-zinc-200"
 }

 dark:border-zinc-700
 dark:bg-zinc-900
 `}
 >

 <div
 className={`
 mt-2
 h-3
 w-3
 rounded-full

 ${
 !notification.read
 ? "bg-[#408A71]"
 : "bg-zinc-400"
 }
 `}
 />

 <div className="flex-1">

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {notification.title}
 </h3>

 <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
 {notification.message}
 </p>

 <p className="mt-3 text-xs text-zinc-400">
 {new Date(notification.createdAt).toLocaleString()}
 </p>

 </div>

 </button>
 );
};

export default NotificationCard;