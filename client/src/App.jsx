import React from 'react'
import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'

import {logo} from './assets'
import {logofr} from './assets'
import {Home, CreatePost} from './pages'

const App = () => {
  return (
    <BrowserRouter>
    <header className='w-full flex
    justify-between items-center bg-vbg-2 sm:px-8 px-4 py-4 border-b border-b-[#e6eebf4]'>
      <Link to='/'>
        <h1 className='font-vina text-4xl text-zinc-50'>ArtiGen</h1>
      </Link>

      <Link to='/create-post' className='font-poppins font-medium bg-red-1 text-white px-4 py-2 rounded-md'>
        Create Art
      </Link>

    </header>
    
    <main className='sm:p-8 px-4 py-8 w-full bg-vbg-1 min-h-[calc(100vh-73px)]'>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
    </main>
    <footer className='invisible md:visible w-full flex fixed bottom-0 right-0
       sm:px-4 px-4 py-4 border-b border-b-[#e6eebf4] gap-3 justify-between pointer-events-none'>
        <a href="https://github.com/leon-plackal" className=' pointer-events-auto'>
          <img src={logofr} alt="logo" className='w-7 object-contain'/>
        </a>
      
    <div className=' justify-end items-end flex flex-col pointer-events-auto'>
          <p className='mt-1'>Powered by</p>
          <a href="https://openai.com/">
            <img src={logo} alt="logo" className='w-20 object-contain'/>
          </a>
    </div>
        
    </footer>
    </BrowserRouter>
  )
}

export default App