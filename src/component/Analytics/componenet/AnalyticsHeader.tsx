
const AnalyticsHeader = () => {
 return (
 <section
 className="
 flex
 flex-col
 gap-5
 lg:flex-row
 lg:items-center
 lg:justify-between
 "
 >
 {/* Left */}
 <div>
 <h1
 className="
 text-2xl
 font-bold
 tracking-tight
 text-zinc-900
 dark:text-white
 sm:text-3xl
 "
 >
 Analytics
 </h1>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Track your hiring performance and recruitment
 progress.
 </p>
 </div>


 </section>
 );
};

export default AnalyticsHeader;