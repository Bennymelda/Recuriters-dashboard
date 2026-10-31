import { useEffect } from 'react';
import './index.css';
import JobApplicationPage from './component/jobs/JobPages/JobApplicationPage';
import Home from './pages/Home';
import RoleProtectedRoute from './RoleProtectedRoute';
import { Route, Routes, useLocation } from 'react-router-dom';
import JobPage from './component/jobs/JobPage';
import JobDetails from './component/jobs/JobDetailsPage';
import DashboardLayout from './pages/dashboard/DasboardLayout';
import CandidateProfilePage from './component/Candidates/CandidatesProfile/CandidateProfilePage';
import CandidatePage from './component/Candidates/CandidatePage';
import PipelinePage from './component/pipeline/PipelinePag';
import InterviewsPage from './component/interviews/InterviewsPage';
import TeamPage from './component/team/TeamPage';
import TeamMemberProfilePage from './component/team/TeamProfile/TeamProfile';
import DashboardPage from './component/Dashboard/DashboardPage';
import Signup from './pages/auth/Signup';
import SelectRole from './pages/auth/Onboarding';
import Login from './pages/auth/Login';
import ProtectedRoute from './routes/ProtectedRoutes';
import ForgotPassword from './pages/auth/Forgot';
import SettingsPage from './component/Settings/settingPage';
import Notifications from './pages/header/Notifcations';
import AnalyticsPage from './component/Analytics/AnalyticsPage';
import CompleteProfile from './pages/auth/Onboarding';
import AcceptInvitation from './component/team/AcceptInvitaton';
import JobApplicationForm from './component/jobs/JobPages/JobApplicationForm';
import HiringManagerDashboard from './hiring-manager/HiringManagerDahboard';
import CandidateOffer from './component/Candidates/CandidateOffer';
import RecruiterDashboard from './Recuriter/RecuriterDashboard';
import RecruiterOfferPage from './Recuriter/RecruiterOfferPage';
import ToastContainer from './component/toast/ToastContainer';
//import RecruiterOffers from './Recuriter/RecruiterOffer';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ToastContainer />
      <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/accept-invitation/:invitationId" element={<AcceptInvitation />} />
<Route path="/settings" element={<SettingsPage />} />
<Route
 path="/candidate/offer/:offerId"
 element={<CandidateOffer />}
/>
      {/* PUBLIC JOB APPLICATION */}
      <Route path="/jobs/:jobId/apply" element={<JobApplicationForm />} />
      <Route path="/apply/:jobId" element={<JobApplicationPage />} />

      {/* PROTECTED DASHBOARD */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* ALL AUTHENTICATED USERS */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        <Route path="/notifications" element={<Notifications />} />

        {/* TEAM — ADMIN + HR MANAGER */}
        <Route
          element={
            <RoleProtectedRoute allowedRoles={["Admin", "HR Manager", "Recruiter"]} />
          }
        >
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:memberId" element={<TeamMemberProfilePage />} />
           <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/candidates/:id" element={<CandidateProfilePage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/interview" element={<InterviewsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        {/* ADMIN + RECRUITER */}
        <Route
          element={
            <RoleProtectedRoute allowedRoles={["Admin", "Recruiter"]} />
          }
        >
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/candidates/:id" element={<CandidateProfilePage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/interview" element={<InterviewsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route
  path="/recruiter"
  element={<RecruiterDashboard />}

/>
<Route
  path="/recruiter/offers/:candidateId"
  element={<RecruiterOfferPage />}
/>
{/*
<Route
  path="/recruiter/offers"
  element={<RecruiterOffers />}
/>
*/}
        </Route>

        {/* HIRING MANAGER */}
        <Route
          element={
            <RoleProtectedRoute allowedRoles={["Admin", "Hiring Manager"]} />
          }
        >
          <Route path="/hiring-manager" element={<HiringManagerDashboard />} />
          <Route path="/hiring-manager/jobs" element={<JobPage />} />
          <Route path="/hiring-manager/jobs/:id" element={<JobDetails />} />
          <Route path="/hiring-manager/candidates" element={<CandidatePage />} />
           <Route path="/hiring-manager/pipeline" element={<PipelinePage />} />
           <Route path="/hiring-manager/candidates/:id" element={<CandidateProfilePage />} />
          <Route path="/hiring-manager/interviews" element={<InterviewsPage />} />
          
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
