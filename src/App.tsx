import { Header } from './layout/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { Challenge } from './pages/Challenge'
import { ChallengeDetail } from './pages/ChallengeDetail'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'
import { NewSubmission } from './pages/NewSubmission'
import { SubmissionHeader } from './components/SubmissionHeader'
import { Submission } from './pages/Submission'
import { NotFound } from './pages/NotFound'
import { PreviewFullScreen } from './pages/PreviewFullScreen'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const { pathname } = useLocation();
  const isSubmissionPage = /^\/challenges\/\d+\/submissions\/\d+$/.test(pathname);
  const isPreviewPage = pathname.includes('/preview');

  return (
    <div
      className={`w-full bg-zinc-900 text-zinc-200  min-h-screen
            text-base`}>
      {isSubmissionPage ? <SubmissionHeader className='fade-in-down' /> : isPreviewPage ? undefined : <Header className='fade-in-down' />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenge />} />
        <Route path="/challenges/:id/submissions" element={<ChallengeDetail />} />
        <Route path="/challenges/:id/newsubmission" element={<NewSubmission />} />
        <Route path="/challenges/:challengeid/submissions/:submissionid" element={<Submission />} />
        <Route path="/signin" element={<ProtectedRoute isPublic element={<Signin />} />} />
        <Route path="/signup" element={<ProtectedRoute isPublic element={<Signup />} />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
        <Route path="/preview/:submissionid" element={<PreviewFullScreen />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
