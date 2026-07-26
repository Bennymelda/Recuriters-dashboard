// components/Breadcrumb.tsx

import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

interface BreadcrumbItem {
 label: string;
 href?: string;
}

interface BreadcrumbProps {
 items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
 return (
 <nav className="flex items-center gap-2 text-sm">

 {items.map((item, index) => {
 const last = index === items.length - 1;

 return (
 <div
 key={item.label}
 className="flex items-center gap-2"
 >

 {last ? (
 <span className="font-semibold text-zinc-900 dark:text-white">
 {item.label}
 </span>
 ) : (
 <Link
 to={item.href!}
 className="text-zinc-500 transition hover:text-[hashtag#408A71] dark:text-zinc-400 dark:hover:text-[hashtag#B0E4CC]"
 >
 {item.label}
 </Link>
 )}

 {!last && (
 <MdChevronRight className="text-zinc-400" />
 )}

 </div>
 );
 })}

 </nav>
 );
};

export default Breadcrumb;