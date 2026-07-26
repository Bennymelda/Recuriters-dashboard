interface DescriptionSectionProps {
 description: string;
 setDescription: (value: string) => void;
}

const DescriptionSection = ({
 description,
 setDescription,
}: DescriptionSectionProps) => {
 return (
 <section className="rounded-2xl border border-zinc-200 bg-white p-4 md:p-6 dark:border-zinc-800 dark:bg-zinc-900">
 <div className="mb-5">
 <h2 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 Job Description
 </h2>

 <p className="mt-1 text-xm md:text-md text-zinc-500 dark:text-zinc-400">
 Describe the role, responsibilities, expectations, and what makes this opportunity exciting.
 </p>
 </div>

 <textarea
 rows={6}
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder="Write a detailed job description..."
 className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-3 md:px-4 text-sm leading-6 md:leading-7 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-teal-900"
 />

 <div className="mt-2 flex flex-col gap-1 md:items-center md:justify-between  text-xs text-zinc-500 dark:text-zinc-400">
 <span>Be as descriptive as possible.</span>

 <span>{description.length} characters</span>
 </div>
 </section>
 );
};

export default DescriptionSection;