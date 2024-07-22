import { useState } from 'react'
import { Header } from './Header'
import { Hero } from './Hero'
import { Filter } from './Filter'
import { Banner } from './Banner'
import { Post } from './Post'

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
