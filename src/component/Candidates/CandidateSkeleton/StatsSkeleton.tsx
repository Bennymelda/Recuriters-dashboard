const CandidateStatsSkeleton = () => {

return (

<div className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
xl:grid-cols-4
">

{
Array.from({length:4}).map((_,i)=>(
<div
key={i}
className="
h-40
rounded-3xl
bg-zinc-200
dark:bg-zinc-700
"
/>
))
}

</div>

)

}

export default CandidateStatsSkeleton 