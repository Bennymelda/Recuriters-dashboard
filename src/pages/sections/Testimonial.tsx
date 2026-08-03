import { FaRegStar} from "react-icons/fa";

const Testimonial = () => {
 const testimonials = [
 {
 name: "Sarah Jenkins",
 role: "Head of People at Velocity",
 text:
 "CareerFlow reduced our time-to-hire by 40%. The automated scheduling alone saved our HR team 10 hours a week.",
 img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjLTRQ1tHwNRDkJJA342FKTxkm2-f2WoADwUvaH2WAn1IBMJIEym5fwy_-FmRRqonX29E9rF0jM22JclvwQ5tOfY6Pb-UvPryJTk-_T6AB-jSNLkYDdd5XRe5b8kzZpDQyRTeQNF3AhuL9E5VvM79NYPEBntz3AZpL7CM5Xoe9BGnLAVZNUspQVnBwKyO6LUw75KGJwqLuwJEI5KjcMC7_HbrSIQaXZQXpVjAncl23GxXN6ESSayRRDXYbfdg9Zs0cvOb7Ulg4IMs",
 stars: 6,
 },
 {
 name: "David Miller",
 role: "Senior Recruiter at Nexus AI",
 text:
 "The best ATS I've used in 10 years. It's actually designed for recruiters, not just for data entry.",
 img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAypfK0Wynafi641r7AR2N_-LGBLReUDo-QXLXdEdI5S8dya0BfRelYarVa3WpD72dV0An0UvDX7hnnFwgEGvHhPx0Q9E9aKcRyW6id2S9_z3Vf3H0sTkbzwxQx8TvPyjBZbn_8Nnt_eL-Ckc83Hn2ii38YIiP7RId1nqqSCCBEZ4GYh3Zj-3f8x3MJTyclvijHoUvgVaPAMR9Tjee619vr0loNR_AdfmiIJgEzNZo3K-OKgjjrtFQxyOoQ-rZttOv90cjKp16vEoQ",
 stars: 5,
 },
 {
 name: "Elena Rodriguez",
 role: "Talent Lead at CloudCore",
 text:
 "Candidate experience has improved drastically. We're getting much higher acceptance rates since switching.",
 img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKmoyPkIXG2X6_DpKWEU5qlICCeOWMbxdZb6NmCeXk14TD7zG4EL3RT8fYEw8Ys75YE5EWCCqgWR6wONsFmU-E7asXhP1anrU-b_TCK4anHww1u0p0TfE_6vy1M0OzGGv0y-b9bcwnSXZGqC601gVZRC0LFDlFrBO-zAWyAYpXfBlQQAmV2zqbUNnx-V_39V5_I8_4R1NLQ3fXBcbyNM37NcQtG4qF09govxrpqu1MVhN0SfHXIhbzwY1CQoAkMdxuLZ-wAhaZunI",
 stars: 6,
 },
 ];

 return (
 <section className="py-xl bg-surface-container-low overflow-hidden">
 <div className="max-w-container-max mx-auto px-gutter">

 {/* Heading */}
 <div className="text-center mb-20">
 <h2 className=" text-2xl md:text-3xl font-semibold">
 Recruiters love CareerFlow
 </h2>
 </div>

 {/* GRID (desktop) + SCROLL (mobile) */}
 <div
 className="
 flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3
 snap-x snap-mandatory scroll-smooth scrollbar-none
 pb-4
 "
 >
 {testimonials.map((item, index) => (
 <div
 key={index}
 className="
 min-w-[85%] md:min-w-0 snap-center
 bg-white dark:bg-zinc-800 px-6
 py-8 rounded-xl
 shadow-sm 

 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10
 "
 >
 {/* Stars */}
 <div className="flex text-[#285A48] dark:text-[#B0e4CC] mb-4 gap-1">
 {Array.from({ length: item.stars }).map((_, i) => (
 <FaRegStar key={i} />
 ))}
 </div>

 {/* Text */}
 <p className="italic md:text-md dark:text-gray-300 mb-4">
 "{item.text}"
 </p>

 {/* User */}
 <div className="flex items-center gap-2">
 <img
 src={item.img}
 className="w-12 h-12 rounded-full"
 alt={item.name}
 />
 <div>
 <p className="font-seibold dark:text-gray-200">
 {item.name}
 </p>
 <p className="text-xs text-gray-600 dark:text-gray-300 md:text-sm">
 {item.role}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
};

export default Testimonial;