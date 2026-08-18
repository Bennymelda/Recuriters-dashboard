import { useState } from "react";
import ThemeToggle from "../../pages/header/ThemeToggle";
import { Link } from "react-router";


const Navbar = () => {

const [open, setOpen] = useState(false);
const [active, setActive] = useState("Home");


return (

<div className="sticky top-2 z-50 relative w-full bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl ">

<div className="max-w-container-max mx-auto px-gutter py-4 flex items-center justify-between px-4">

{/* Logo */}

<div className="text-xl font-bold text-[#285A48] dark:text-[#B0E4CC]">CareerFlow</div>



{/* Desktop Links */}

<div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

 <a
 href="#hero"
 onClick={() => setActive("Home")}
 className={`cursor-pointer transition ${
 active === "Home" ? "text-[#285A48] dark:text-[#B0E4CC] font-semibold" : "hover:text-[#285A48] dark:text-gray-300 text-gray-700"
 }`}
 >
 Home
 </a>

 <a
 href="#features"
 onClick={() => setActive("Features")}
 className={`cursor-pointer transition ${
 active === "Features" ? "text-[#285A48] dark:text-[#B0E4CC] font-semibold" : "hover:text-[#285A48] dark:text-gray-300 text-gray-700"
 }`}
 >
 Features
 </a>

 <a
 onClick={() => setActive("Contact")}
 className={`cursor-pointer transition ${
 active === "Contact" ? "text-[#285A48]  dark:text-[#B0E4CC] font-semibold" : "hover:text-[#285A48]  dark:text-gray-300 text-gray-700"
 }`}
 >
 Contact
 </a>

 

</div>



{/* Desktop Button */}

<div className="hidden md:flex items-center gap-2">
<ThemeToggle />
<Link to='/signup' className="px-5 whitespace-nowrap py-2.5 bg-[#285A48] dark:text-black dark:bg-[#B0E4CC] text-white rounded-lg font-semibold transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3525cd]/30 active:scale-95">

Get Started

</Link>



</div>



{/* Mobile Hamburger */}

<button

onClick={() => setOpen(!open)}

className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1"

>

<span

className={`block h-0.5 w-6 bg-black dark:bg-white transition-all duration-300 ${

open ? "rotate-45 translate-y-1.5" : ""

}`}

/>

<span

className={`block h-0.5 w-6 bg-black dark:bg-white transition-all duration-300 ${

open ? "opacity-0" : ""

}`}

/>

<span

className={`block h-0.5 w-6 bg-black dark:bg-white transition-all duration-300 ${

open ? "-rotate-45 -translate-y-1.5" : ""

}`}

/>

</button>

</div>



{/* Mobile Menu — floats over page content, sticks with the navbar */}

<div

className={`

md:hidden

absolute top-full left-0 right-0

bg-white/95 dark:bg-white/5  backdrop-blur-md
z-200
border-b border-gray-100 dark:border-white/10 

overflow-hidden

transition-all duration-500 ease-in-out

${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}

`}

>

<div className="flex flex-col gap-4 px-gutter pb-4 pt-2  text-gray-700 font-medium">

<a
href="#hero"
 onClick={() => {
 setActive("Home");
 setOpen(false);
 }}
 className={`cursor-pointer transition ${
 active === "Home" ? "text-[#285A48] dark:text-[#B0E4CC] font-semibold" : "hover:text-[#285A48] dark:text-gray-300 text-gray-700"
 }`}
>
 Home
</a>

<a
href="#features"
 onClick={() => {
 setActive("Features");
 setOpen(false);
 }}
 className={`cursor-pointer transition ${
 active === "Features" ? "text-[#285A48] dark:text-[#B0E4CC] font-semibold" : "hover:text-[#285A48] dark:text-gray-300 text-gray-700"
 }`}
>
 Features
</a>

<a
 onClick={() => {
 setActive("Contact");
 setOpen(false);
 }}
 className={`cursor-pointer transition ${
 active === "Contact" ? "text-[#285A48] dark:text-[#B0E4CC]font-semibold" : "hover:text-[#285A48] dark:text-gray-300 text-gray-700"
 }`}
>
 Contact
</a>
<ThemeToggle />

<Link to="/signup" className="mt-2 px-5 py-2.5 bg-[#285A48] dark:text-black dark:bg-[#B0E4CC] text-white  rounded-lg font-semibold transition-all duration-300 active:scale-95">

Get Started

</Link>


</div>

</div>

</div>

);

};



export default Navbar;