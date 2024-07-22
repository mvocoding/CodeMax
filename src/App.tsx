import { Header } from './layout/Header'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Challenge } from './pages/Challenge'
import { ChallengeDetail } from './components/ChallengeDetail'
import { Learn } from './pages/Learn'

function App() {

  return (
    <div className={` w-full bg-zinc-900 text-zinc-200  min-h-screen
            [&_h2]:text-rose-600
        [&_h2]:text-xl
        [&_h2]:font-medium
        [&_h2]:uppercase
        `}>
      <Header className='px-10'></Header>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/challenges" element={ <Challenge /> } />
        <Route path="/challenges/:id" element={ <ChallengeDetail /> } />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </div>
  )
}

export default App
