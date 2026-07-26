const Pricing = () => {
    return ( <>
    <section className="py-xl max-w-container-max mx-auto px-gutter">
<div className="text-center mb-lg">
<h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Transparent pricing for every stage</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Choose the plan that fits your current hiring needs.</p>
</div>
<div className="grid md:grid-cols-3 gap-md items-stretch">
<div className="bg-white p-md rounded-xl border border-outline-variant/30 flex flex-col hover:shadow-lg transition-all">
<h3 className="font-headline-sm text-headline-sm mb-xs">Free Plan</h3>
<p className="text-body-sm text-on-surface-variant mb-md">Perfect for small teams starting out.</p>
<div className="mb-md">
<span className="text-headline-lg font-bold">$0</span>
<span className="text-on-surface-variant">/month</span>
</div>
<ul className="space-y-sm mb-lg flex-grow">
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Up to 3 job posts</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> 50 candidates</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Basic hiring pipeline</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Candidate profiles</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Recruiter notes</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Simple dashboard</li>
</ul>
<button className="w-full py-xs border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors mt-auto">Get Started</button>
</div>
<div className="bg-surface-container-low p-md rounded-xl border-2 border-primary flex flex-col relative shadow-xl transform scale-105 z-10">
<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary text-[10px] font-bold px-sm py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>
<h3 className="font-headline-sm text-headline-sm mb-xs">Pro Plan</h3>
<p className="text-body-sm text-on-surface-variant mb-md">For growing companies with active pipelines.</p>
<div className="mb-md">
<span className="text-headline-lg font-bold">$49</span>
<span className="text-on-surface-variant">/month</span>
</div>
<ul className="space-y-sm mb-lg flex-grow">
<li className="flex items-start gap-xs text-body-sm font-semibold"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Unlimited jobs &amp; candidates</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Advanced pipeline &amp; scoring</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Advanced Analytics (Source tracking)</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Team Collaboration (@mentions)</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Interview Scheduling System</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Resume Viewer &amp; Parsing</li>
</ul>
<button className="w-full py-xs bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md mt-auto">Get Started</button>
</div>
<div className="bg-white p-md rounded-xl border border-outline-variant/30 flex flex-col hover:shadow-lg transition-all">
<h3 className="font-headline-sm text-headline-sm mb-xs">Premium Plan</h3>
<p className="text-body-sm text-on-surface-variant mb-md">Enterprise-grade AI-powered recruitment.</p>
<div className="mb-md">
<span className="text-headline-lg font-bold">Custom</span>
</div>
<ul className="space-y-sm mb-lg flex-grow">
<li className="flex items-start gap-xs text-body-sm font-semibold"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> AI Candidate Matching</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Compatibility scoring</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Role-based access control</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Custom reports &amp; exports</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Calendar &amp; Email integrations</li>
<li className="flex items-start gap-xs text-body-sm"><span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span> Dedicated Support</li>
</ul>
<button className="w-full py-xs border border-on-surface text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-colors mt-auto">Contact Sales</button>
</div>
</div>
</section>
    </> );
}
 
export default Pricing;