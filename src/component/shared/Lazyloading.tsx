import { useEffect, useRef, useState } from "react";

export default function LazyReveal({ children }:{children: React.ReactNode}) {
 const ref = useRef(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 observer.disconnect(); // run once (lazy load)
 }
 },
 {
 threshold: 0.15, // triggers when 15% visible
 }
 );

 if (ref.current) observer.observe(ref.current);

 return () => observer.disconnect();
 }, []);

 return (
 <div
 ref={ref}
 style={{ transitionDelay: "150ms" }}
 className={`
 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
 ${isVisible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-10 scale-95 blur"}
 `}
 >
 {children}
 </div>
 );
}