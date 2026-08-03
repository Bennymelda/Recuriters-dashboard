export default function Footer() {
 return (
 <footer className=" text-gray-700 py-12 mt-20">
 <div className="max-w-12xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

 {/* Brand */}
 <div>
 <h2 className="text-black text-xl font-bold">CareerFlow</h2>
 <p className="text-sm mt-3 dark:text-gray-300 text-gray-700">
 A modern recruitment dashboard for managing jobs, candidates, and hiring workflows.
 </p>
 </div>

 {/* Dashboard */}
 <div>
 <h3 className="text-black font-semibold mb-4 dark:text-gray-300 ">Dashboard</h3>
 <ul className="space-y-2 text-sm dark:text-gray-400 ">
 <li>Overview</li>
 <li>Jobs</li>
 <li>Candidates</li>
 <li>Hiring Pipeline</li>
 </ul>
 </div>

 {/* Management */}
 <div>
 <h3 className="text-black font-semibold mb-4 dark:text-gray-300">Management</h3>
 <ul className="space-y-2 text-sm dark:text-gray-400">
 <li>Interviews</li>
 <li>Analytics</li>
 <li>Team</li>
 <li>Settings</li>
 </ul>
 </div>

 {/* Product */}
 <div>
 <h3 className="text-black font-semibold mb-4 dark:text-gray-300 ">Product</h3>
 <ul className="space-y-2 text-sm dark:text-gray-400">
 <li>Features</li>
 <li>How it Works</li>
 <li>Demo</li>
 
 </ul>
 </div>
 </div>

 {/* Bottom */}
 <div className="border-t dark:text-gray-400 border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
 © {new Date().getFullYear()} CareerFlow. Built for modern hiring teams.
 </div>
 </footer>
 );
}