export const formatJoinedDate = (date: string) => {
 const joinedDate = new Date(date);

 const day = joinedDate.getDate();
 const year = joinedDate.getFullYear();

 const month = joinedDate.toLocaleString("en-US", {
 month: "long",
 });

 const getOrdinal = (day: number) => {
 if (day > 3 && day < 21) return "th";

 switch (day % 10) {
 case 1:
 return "st";
 case 2:
 return "nd";
 case 3:
 return "rd";
 default:
 return "th";
 }
 };

 return `${month} ${day}${getOrdinal(day)} ${year}`;
};