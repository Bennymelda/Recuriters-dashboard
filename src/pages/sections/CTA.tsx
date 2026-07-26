const CTA = () => {
    return ( <>
    <section className="py-10 mb-20">
 <div className="max-w-container-max mx-auto text-center">
 <div className="bg-[#e3e0ff] rounded-[2.5rem] py-xl px-10 py-10 md:py-10 md:px-20 space-y-md relative overflow-hidden">

 {/* SVG Decorations */}
 <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
 <defs>
 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3525cd" strokeWidth="0.5" />
 </pattern>
 </defs>
 <rect width="100%" height="100%" fill="url(#grid)" />
 </svg>

 {/* Glow blobs */}
 <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
 <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
 <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary-fixed rounded-full blur-3xl"></div>
 </div>



 <h2 className="text-2xl mb-2 md:text-4xl font-semibold relative z-10">
 Ready to transform your hiring process?
 </h2>

 <p className="text-gray-700 md:text-lg max-w-xl mx-auto relative z-10">
 Join the thousands of teams finding their next great hire with CareerFlow.
 </p>

 <div className="pt-5 relative z-10">
 <button
 className="
 px-6 py-4
 bg-[#3525cd]
 text-white
 mt-5
 rounded-lg
 font-bold
 cursor-pointer
hover:bg-white
hover:text-[#3525cd]
 transition-all duration-500 ease-out
 hover:-translate-y-2
 hover:shadow-2xl
 hover:shadow-[#3525cd]/30
 hover:scale-105
 active:scale-95
 "
 >
 Get Started Free
 </button>
 </div>

 </div>
 </div>
</section>
    </> );
}
 
export default CTA;