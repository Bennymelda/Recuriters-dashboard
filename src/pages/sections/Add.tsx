import { FaRegCheckCircle } from "react-icons/fa";

const Add = () => {
    return ( <>
<section className=" max-w-container-max mx-auto ter overflow-hidden mb-20 ">
<div className="bg-[#3525cd] p-10 rounded-[2rem] p-lg lg:p-xl flex flex-col lg:flex-row items-center gap-10 relative">
<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
<div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
<div className="lg:w-1/2 space-y-md text-on-primary relative z-10">
<h2 className=" text-white text-2xl md:text-4xl font-semibold mb-4">Data-driven hiring at your fingertips</h2>
<p className="text-gray-100">Get a bird's-eye view of your recruitment health. Track conversion rates, team performance, and cost-per-hire in real-time.</p>
<ul className="space-y-sm mt-10">
<li className="flex items-center gap-2">
<FaRegCheckCircle className="text-[#a59ee5]"/>
<span className="text-gray-200">Customizable hiring funnel visualizer</span>
</li>
<li className="flex items-center gap-2">
<FaRegCheckCircle className="text-[#a59ee5]"/>
<span className="text-gray-200">Automated EEO and compliance reporting</span>
</li>
<li className="flex items-center gap-2">
<FaRegCheckCircle className="text-[#a59ee5]"/>
<span className="text-gray-200">One-click data export to HRIS</span>
</li>
</ul>
<button className="px-6 py-4 bg-white text-[#3525cd] mt-5 rounded-lg font-bold hover:bg-[#665eda] transition-colors hover:text-white">Explore Dashboard</button>
</div>
<div className="lg:w-1/2 w-full">
<div className=" bg-white/10 rounded-2xl p-sm shadow-2xl backdrop-blur-sm border-white/20">
<img alt="Analytics Dashboard Detail" className="rounded-xl shadow-lg" data-alt="A detailed view of a high-performance analytics dashboard. It features vibrant blue and teal line charts showing recruitment trends, a clear table of top candidates with profile photos and status badges, and large numeric KPIs for 'Active Openings' and 'Avg. Time to Hire'. The design is sleek, modern, and data-centric." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4D0HuWw36KIEYlLX6jCN1VvzL7VMLmUSQZo-3l0eCI7ZMqGICuPlgRk14_kZnOZcXoiFB51zoN8F48Qn_Tl_euNpgHO-US02IPTqWXZwsD3YARz57WiU7oLpyJYfyTgZlSKw1faeC25wPf21LHglSE7-bVvPGg7K8zN9yx6uguzTJ89xhDzRhLd3lfZsF7yDZibCmMhMV2qKzW9QCa17pMU--XhZeqCaB3qKNcVzySHjm3LMu0f8qeo-a5QWOblJLHtdHE6aP3LI"/>
</div>
</div>
</div>
</section>
    </> );
}
 
export default Add;