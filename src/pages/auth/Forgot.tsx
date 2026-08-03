import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
 const [emailSent, setEmailSent] = useState(false);

 const handleSubmit = (
 e: React.FormEvent
 ) => {
 e.preventDefault();

 // Later this will call your backend
 setEmailSent(true);
 };

 return (
 <div
 className="
 flex
 min-h-screen
 items-center
 justify-center
 bg-zinc-50
 px-4
 dark:bg-zinc-950
 "
 >
 <div
 className="
 w-full
 max-w-md
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-8
 shadow-xl
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {!emailSent ? (
 <>
 <div className="mb-8 text-center">
 <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
 Forgot Password
 </h1>

 <p className="mt-2 text-sm text-zinc-500">
 Enter your work email and we'll send you a password reset link.
 </p>
 </div>

 <form
 onSubmit={handleSubmit}
 className="space-y-5"
 >
 <input
 type="email"
 value={email}
 onChange={(e) =>
 setEmail(e.target.value)
 }
 placeholder="Work email"
 required
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 outline-none
 focus:border-[#408A71]
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-white
 "
 />

 <button
 type="submit"
 className="
 w-full
 rounded-2xl
 bg-[#408A71]
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#285A48]
 "
 >
 Send Reset Link
 </button>
 </form>
 </>
 ) : (
 <div className="text-center">
 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
 Check your inbox
 </h2>

 <p className="mt-4 text-zinc-500">
 If an account exists with this email,
 we've sent a password reset link.
 </p>

 <Link
 to="/login"
 className="
 mt-8
 inline-block
 rounded-2xl
 bg-[#408A71]
 px-6
 py-3
 font-semibold
 text-white
 transition
 hover:bg-[#285A48]
 "
 >
 Back to Login
 </Link>
 </div>
 )}
 </div>
 </div>
 );
};

export default ForgotPassword;