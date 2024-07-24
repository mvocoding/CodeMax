import { Header } from './layout/Header'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Challenge } from './pages/Challenge'
import { Learn } from './pages/Learn'
import { ChallengeDetail } from './pages/ChallengeDetail'
import { Playground } from './pages/Playground'
import { Signin } from './pages/Login'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'

function App() {

  return (
      <div className={` w-full bg-zinc-900 text-zinc-200  min-h-screen
            text-base
        `}>
        <Header className='px-10'></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenge />} />
          <Route path="/challenges/:id" element={<ChallengeDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
  )
}

export default App
