import { Header } from './layout/Header'
import { Hero } from './layout/Hero'
import { Filter } from './components/Filter'
import { Banner } from './layout/Banner'
import { Post } from './components/Post'

function App() {

  return (
    <div className={` w-full bg-zinc-900 text-zinc-200  min-h-screen
            [&_h2]:text-rose-600
        [&_h2]:text-xl
        [&_h2]:font-medium
        [&_h2]:uppercase
        `}>
      <Header className='px-10'></Header>
      <Hero className='flex justify-center'></Hero>
      <Banner className='max-w-[80%] mx-auto'></Banner>
      <Filter></Filter>
      <Post className='max-w-[90%] mx-auto'></Post>
    </div>
  )
}

export default App
