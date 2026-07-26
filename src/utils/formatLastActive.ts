export const formatLastActive = (date: string) => {
 const lastActive = new Date(date);
 const now = new Date();

 const diff = now.getTime() - lastActive.getTime();

 const minutes = Math.floor(diff / (1000 * 60));
 const hours = Math.floor(diff / (1000 * 60 * 60));
 const days = Math.floor(diff / (1000 * 60 * 60 * 24));

 if (minutes < 1) return "Just now";

 if (minutes < 60) {
 return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
 }

 if (hours < 24) {
 return `${hours} hour${hours > 1 ? "s" : ""} ago`;
 }

 if (days === 1) return "Yesterday";

 return `${days} day${days > 1 ? "s" : ""} ago`;
};

