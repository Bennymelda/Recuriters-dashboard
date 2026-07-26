import { MdInbox } from "react-icons/md";

interface PipelineEmptyProps {
 stage: string;
}

const PipelineEmpty = ({
 stage,
}: PipelineEmptyProps) => {
 return (
 <div
 className="
 flex
 min-h-[220px]
 flex-col
 items-center
 justify-center
 rounded-2xl
 border-2
 border-dashed
 border-zinc-300
 bg-white
 p-6
 text-center
 dark:border-zinc-700
 dark:bg-zinc-800
 "
 >
 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
 <MdInbox
 size={28}
 className="text-zinc-500 dark:text-zinc-300"
 />
 </div>

 <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
 No candidates
 </h3>

 <p className="mt-2 max-w-[220px] text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 There are currently no candidates in the{" "}
 <span className="font-semibold">{stage}</span> stage.
 </p>
 </div>
 );
};

export default PipelineEmpty;