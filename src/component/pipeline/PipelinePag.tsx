import PipelineHeader from "./PipelineHeader";
import PipelineStats from "./PipelineStats";
import PipelineBoard from "./PipelineBoard";

const PipelinePage = () => {
  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="flex-none space-y-6">
        
        <PipelineHeader />
        <PipelineStats />
        
      </div>
      <div>

{/* 
<div className="flex items-center justify-between">

<div>
<h2
className="
text-xl
font-bold
text-zinc-900
dark:text-white
"
>
Hiring Pipeline
</h2>

<p
className="
mt-1
text-sm
text-zinc-500
dark:text-zinc-400
"
>
Manage and track candidates across every recruitment stage.
</p>

</div>


<div
className="
hidden
items-center
gap-2

rounded-full
border
border-zinc-200
bg-white
px-4
py-2

text-sm
text-zinc-500

dark:border-zinc-700
dark:bg-zinc-900
dark:text-zinc-400

md:flex
"
>

<span className="h-2 w-2 rounded-full bg-[#285A48]" />

5 Stages

</div>


</div>

*/}

        <div className="min-h-0 flex-1 overflow-auto">
        <PipelineBoard />
      </div>
      </div>
      
    </div>
  );
};

export default PipelinePage;