import { Link } from "react-router";

const Hero = () => {
    return ( <>
    <section id="hero" className="hero-gradient mt-20 md:mt-30 relative overflow-hidden min-h-[90vh] flex items-center">
<div className="max-w-container-max mx-auto px-gutter grid lg:grid-cols-2 gap-10 items-center relative z-10">
<div className="space-y-md animate-fade-in">
<h1 className=" text-4xl lg:text-5xl font-bold text-gray-800 mb-4 max-w-xl">
                        Hire smarter. Build stronger teams faster.
                    </h1>
<p className="text-gray-700 md:text-lg max-w-lg">
                        CareerFlow helps modern companies manage candidates, automate hiring workflows, and find the right talent with confidence.
                    </p>
<div className="flex flex-row  gap-2 pt-5">
<Link
to="/signup"
className="px-6 md:px-8 py-4 bg-[#3525cd] text-white mt-5 rounded-lg font-bold hover:bg-white cursor-pointer transition-colors  hover:text-[#3525cd] hover:transition-all hover:-translate-y-2
 hover:shadow-xl  hover:duration-300">Start Hiring</Link>
<button 
className="px-6 md:px-8 py-4 bg-white text-gray-800 mt-5 rounded-lg shadow-lg font-bold hover:bg-[#3525cd] cursor-pointer transition-colors  hover:text-white hover:transition-all hover:-translate-y-2
 hover:shadow-xl   hover:duration-300">  View Demo </button>
</div>

</div>
<div className="relative group">
<div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl opacity-50"></div>
<div className="relative glass-card rounded-2xl shadow-2xl p-sm border border-outline-variant/30 transform transition-all duration-700 hover:rotate-1">
<img alt="Recruitment Dashboard" className="rounded-xl w-full" data-alt="A highly detailed and modern recruitment software dashboard displaying complex analytics charts, a clean candidate pipeline visualization, and a professional user interface. The UI features a crisp white background with indigo and slate accents. Floating UI elements like small circular progress charts and notification badges add depth and sophistication." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxjwMzJ2iH8_geCQ8N_XAy2SxBMIQB3mn-_gw7c8MBQ8l8n3KuSRuMSQ32YhXooDOH1kBdpjjo9qmOnhnf1T4zEppaafZoJaqQYVsZ6Qpi5vsmLLlKoNk95gbRAxosg_5WgGHO14-N22x6jELefeZTDutm8vrCnfOZtVSZtkhoXBc3PeA4MJIqLBZKxO8EU3zcM4iaM0Qr1I9Va5FL7PEq39TscKcuZ1R3AQ37MDHXjE_ghm-30IMgB9EF6DRsixn5JE4AMasQ6HI"/>
</div>
</div>
</div>
</section>
    </> );
}
 
export default Hero;