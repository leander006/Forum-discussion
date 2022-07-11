import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

function Home() {

  const navigate = useNavigate()
  const explore = (e) =>{
    e.preventDefault()
    navigate("/explore")
  }


  const login = (e) =>{
    e.preventDefault()
    navigate("/login")
  }

  return (
    <>
    <Navbar/>
      <div className='flex flex-col lg:flex-row-reverse lg:mt-28'>
        <div className='up p-4'>
            <img className=' w-72 h-72 m-auto p-2 lg:w-96 lg:h-96 md:w-80 md:h-80 lg:mr-52 ' src='main.svg'></img>
        </div>
        <div className='downm m-auto'>
          <div className='down-l p-2'>
          <h1 className='text-main text-4xl md:text-5xl'>MAKE <label className=' text-purple-400'>DISCUSSION</label></h1>
            <h2 className='text-main text-5xl md:text-5xl'>Become more </h2>
            <h2 className='text-main text-6xl'>Comfortable</h2>
          </div>
            <div className='down-r flex p-5'>
                <button className=' cursor-pointer rounded-md w-20 md:w-28 md:h-14 bg-main p-1 text-secondary mr-2 hover:bg-purple-600' onClick={explore}>Explore</button>
                <button className=' cursor-pointer rounded-md w-20 p-1 md:w-28  border text-secondary bg-slate-50 hover:text-purple-400' onClick={login}>Login</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Home