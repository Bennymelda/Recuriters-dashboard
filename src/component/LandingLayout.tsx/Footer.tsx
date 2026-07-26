export default function Footer() {
 return (
 <footer className=" text-gray-700 py-12 mt-20">
 <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

 {/* Brand */}
 <div>
 <h2 className="text-black text-xl font-bold">CareerFlow</h2>
 <p className="text-sm mt-3 text-gray-700">
 A modern recruitment dashboard for managing jobs, candidates, and hiring workflows.
 </p>
 </div>

 {/* Dashboard */}
 <div>
 <h3 className="text-black font-semibold mb-4">Dashboard</h3>
 <ul className="space-y-2 text-sm">
 <li>Overview</li>
 <li>Jobs</li>
 <li>Candidates</li>
 <li>Hiring Pipeline</li>
 </ul>
 </div>

 {/* Management */}
 <div>
 <h3 className="text-black font-semibold mb-4">Management</h3>
 <ul className="space-y-2 text-sm">
 <li>Interviews</li>
 <li>Analytics</li>
 <li>Team</li>
 <li>Settings</li>
 </ul>
 </div>

 {/* Product */}
 <div>
 <h3 className="text-black font-semibold mb-4">Product</h3>
 <ul className="space-y-2 text-sm">
 <li>Features</li>
 <li>How it Works</li>
 <li>Demo</li>
 
 </ul>
 </div>
 </div>

 {/* Bottom */}
 <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
 © {new Date().getFullYear()} CareerFlow. Built for modern hiring teams.
 </div>
 </footer>
 );
}