
import { useEffect } from 'react'

import './index.css'
import JobApplicationPage from './component/jobs/JobPages/JobApplicationPage'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import JobPage from './component/jobs/JobPage'
import JobDetails from './component/jobs/JobDetailsPage'
import DashboardLayout from './pages/dashboard/DasboardLayout'
import CandidateProfilePage from './component/Candidates/CandidatesProfile/CandidateProfilePage'
import CandidatePage from './component/Candidates/CandidatePage'
import PipelinePage from './component/pipeline/PipelinePag'
import InterviewsPage from './component/interviews/InterviewsPage'
import TeamPage from './component/team/TeamPage'
import TeamMemberProfilePage from './component/team/TeamProfile/TeamProfile'
import { useLocation} from 'react-router-dom'
import DashboardPage from './component/Dashboard/DashboardPage'
import Signup from './pages/auth/Signup'
import SelectRole from './pages/auth/Onboarding'
import Login from './pages/auth/Login'
import ProtectedRoute from './routes/ProtectedRoutes'
import ForgotPassword from './pages/auth/Forgot'
import SettingsPage from './component/Settings/settingPage'
import Notifications from './pages/header/Notifcations'
import AnalyticsPage from './component/Analytics/AnalyticsPage'
import CompleteProfile from './pages/auth/Onboarding'
import AcceptInvitation from './component/team/AcceptInvitaton'
import JobApplicationForm from './component/jobs/JobPages/JobApplicationForm'
import HiringManagerDashboard from './hiring-manager/HiringManagerDahboard'
//import ToastContainer from './component/ui/ToastContainer'
function App() {
  const { pathname } = useLocation();

 useEffect(() => {
 window.scrollTo(0, 0);
 }, [pathname]);
  return (
 
    <Routes>
   
 <Route path="/" element={<Home />} />
 <Route
 element={
 <ProtectedRoute>
 <DashboardLayout />
 </ProtectedRoute>
 }
>
 <Route path="/dashboard" element={<DashboardPage />} />
 <Route path="/jobs" element={<JobPage />} />
 <Route path="/jobs/:id" element={<JobDetails />} />
 <Route path="/candidates" element={<CandidatePage />} />
 <Route path="/candidates/:id" element={<CandidateProfilePage />} />
 <Route path="/pipeline" element={<PipelinePage />} />
 <Route path="/interview" element={<InterviewsPage />} />
 <Route path="/team" element={<TeamPage />} />
 <Route path="/team/:memberId" element={<TeamMemberProfilePage />} />
 <Route path="/Analytics" element={<AnalyticsPage />} />




<Route
 path="/hiring-manager"
 element={<HiringManagerDashboard />}
/>



</Route>


 <Route 
 path="/select-role"
 element={<SelectRole />}
/>
<Route
 path="/complete-profile"
 element={<CompleteProfile />}
/>
<Route 
 path="/signup"
 element={<Signup />}
/>
<Route
 path="/login"
 element={<Login />}
/>
<Route
 path="/forgot-password"
 element={<ForgotPassword />}
/>
<Route
 path="/settings"
 element={<SettingsPage />}
/>
<Route
 path="/notifications"
 element={<Notifications />}
/>

<Route
 path="/accept-invitation/:invitationId"
 element={<AcceptInvitation />}
/>
<Route
  path="/jobs/:jobId/apply"
  element={<JobApplicationForm />}
/>

// if you want to keep the old route temporarily:
<Route
  path="/apply/:jobId"
  element={<JobApplicationPage />}
/>
// ...existing code...
 </Routes>

  )
}

export default App
