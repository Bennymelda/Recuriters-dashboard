const HowItWorks = () => {
    return ( <>
    <section className=" mt-20 mb-20 ">
<div className="max-w-container-max py-10 rounded-2xl mx-auto ">
<div className="text-center mb-10">
<h2 className=" text-2xl md:text-4xl font-bold  dark:text-white">How It Works</h2>
<p className=" md:text-lg text-gray-700 dark:text-gray-300 ">Three simple steps to build your dream team.</p>
</div>
<div className="grid lg:grid-cols-3 gap-5 relative">
<div className="absolute hidden lg:block top-10 left-1/4 right-1/4 h-px border-t border-dashed border-gray-400"></div>
<div className="flex flex-col items-center text-center relative z-10 ">
<div className="w-16 h-16 bg-[#285A48] dark:bg-[#B0E4CC] dark:text-gray-800 text-white font-bold rounded-full flex items-center justify-center font-headline-md mb-sm shadow-xl">1</div>
<h4 className=" text-xl md:text-2xl font-semibold mb-2 mt-5 dark:text-white">Create a Job</h4>
<p className="text-gray-700 max-w-xs dark:text-gray-300 ">Define your role requirements and post to multiple job boards with one click.</p>
</div>
<div className="flex flex-col items-center text-center relative z-10">
<div className="w-16 h-16 bg-[#285A48] dark:bg-[#B0E4CC] dark:text-gray-800 text-white font-bold rounded-full flex items-center justify-center font-headline-md mb-sm shadow-xl">2</div>
<h4 className=" text-xl md:text-2xl font-semibold mb-2 mt-5 dark:text-white">Review Candidates</h4>
<p className="text-gray-700 max-w-xs dark:text-gray-300">Use our intuitive dashboard to screen applications and conduct automated assessments.</p>
</div>
<div className="flex flex-col items-center text-center relative z-10">
<div className="w-16 h-16 bg-[#285A48] dark:bg-[#B0E4CC] dark:text-gray-800 font-bold rounded-full text-white flex items-center justify-center  shadow-xl">3</div>
<h4 className=" text-xl md:text-2xl font-semibold mb-2 mt-5 dark:text-white">Hire the Best Talent</h4>
<p className="text-gray-700 max-w-xs dark:text-gray-300">Compare candidates side-by-side and extend offers through our secure portal.</p>
</div>
</div>
</div>
</section>
    </> );
}
 
export default HowItWorks;