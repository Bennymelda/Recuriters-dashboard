const CandidateListSkeleton = () => {

return (

<div className="space-y-3">

{
Array.from({length:8}).map((_,i)=>(
<div
key={i}
className="
hidden
lg:grid
h-20
grid-cols-[2.5fr_1.2fr_1.5fr_1.2fr_1fr_120px]
items-center
gap-4
rounded-xl
border
p-4
"
>

<div className="h-10 w-10 rounded-full bg-zinc-200"/>

<div className="h-4 rounded bg-zinc-200"/>

<div className="h-4 rounded bg-zinc-200"/>

<div className="h-4 rounded bg-zinc-200"/>

<div className="h-4 rounded bg-zinc-200"/>

<div className="h-6 rounded-full bg-zinc-200"/>

</div>
))
}


</div>

)

}


export default CandidateListSkeleton 
