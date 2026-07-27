import NotificationCard from "./NotificationCard";
import { MdNotificationsNone } from "react-icons/md";
import { useNotificationStore } from "../../store/notificationStore";


const Notifications = () => {

 const {
 notifications,
 markAsRead,
 markAllAsRead,
 } = useNotificationStore();


 return (
 <div className="space-y-8">

 {/* Header */}

 <div className="flex items-center justify-between">

 <div>
 <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
 Notifications
 </h1>

 <p className="mt-2 text-zinc-500">
 Stay updated with your hiring activities.
 </p>
 </div>


 {notifications.length > 0 && (
 <button
 onClick={markAllAsRead}
 className="
 rounded-xl
 bg-[#408A71]
 px-5
 py-3
 text-sm
 font-semibold
 text-white
 "
 >
 Mark all as read
 </button>
 )}

 </div>



 {/* List */}

 <div className="space-y-4">

 {notifications.length === 0 ? (

 <div
 className="
 flex
 flex-col
 items-center
 justify-center
 rounded-3xl
 border
 border-zinc-200
 py-20
 dark:border-zinc-700
 "
 >

 <MdNotificationsNone
 size={50}
 className="text-zinc-300"
 />

 <p className="mt-4 text-zinc-500">
 No notifications yet.
 </p>

 </div>

 ) : (

 notifications.map((notification)=>(
 <NotificationCard
 key={notification.id}
 notification={notification}
 onRead={() =>
 markAsRead(notification.id)
 }
 />
 ))

 )}

 </div>

 </div>
 );
};


export default Notifications;