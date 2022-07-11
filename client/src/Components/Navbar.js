import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {Context} from "../Contexts/ContextProvider"
function Navbar() {

      const {user,setUser} = useContext( Context);
      const [visible, setVisible] = useState(false);
      const handleVisibility = (e) =>{
            e.preventDefault();
            setVisible(!visible);
      }

      const logout = (e) =>{
            e.preventDefault();
            localStorage.removeItem("userInfo");
            setUser(null);  
      }

  return (
    <div className='container'>
        {!visible && <div className='container'>
          <div className='upper w-screen flex bg-slate-50 justify-between h-10 items-center'>
            <div className='flex items-center '>
                  <i className="fa-solid fa-arrow-down my-5 md:hidden mx-2 cursor-pointer sm:-2xl text-primary" onClick={handleVisibility}></i>
                 <p className='my-4 text-lg sm:text-sm md:p-2 md:text-xl text-navbar' >Forum-Mania</p>
            </div>
            <div className='flex items-center justify-center '>
            <ul className='md:flex flex-row space-x-5 hidden '>
                  <Link className='cursor-pointer text-navbar' to="/">Home</Link>
                  <Link className='cursor-pointer text-navbar' to="/explore">Explore</Link>
                { !user && <Link className='cursor-pointer text-navbar' to="/login">Login</Link>}
                { !user && <Link className='cursor-pointer text-navbar' to="/register">Register</Link>}
                 {user && <h1 className='cursor-pointer text-navbar' onClick={logout}>Logout</h1>}
            </ul>
            
            </div>  
            <div className='flex items-center '>
                  <img className='w-10 h-8 rounded-full mt-2 mb-2 mr-3' src={user?.others?user?.others?.profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU'} alt='image'/>
            </div>
          </div>
      </div>}
      <div className={visible?'bg-slate-50 h-60 w-full top-0 left-0 flex flex-col justify-between lg:w-60 2xl:w-30':'hidden'}>
      <div className='flex items-center flex-row justify-between'>
            <div className='flex flex-row'>
                  <i className="fa-solid fa-arrow-up my-3 mx-2 md:text-xl cursor-pointer  text-navbar" onClick={handleVisibility} ></i>
                 <p className='mr-12 mt-2 md:mr-36 md:text-xl text-right  md:7xl text-navbar' >Forum-Mania</p>
            </div>
            <div className='flex items-center '>
                  <img className='w-10 h-8 rounded-full mt-2 mb-2 mr-3'  src={user?.others?user?.others?.profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU'}  alt='image'/>
            </div>
                 
            </div>
            <div className='flex items-center justify-center '>
            <ul className='flex flex-col space-y-7 '>
                  <Link className='cursor-pointer text-navbar' to="/">Home</Link>
                  <Link className='cursor-pointer text-navbar' to="/explore">Explore</Link>
                  { !user && <Link className='cursor-pointer text-navbar' to="/login">Login</Link>}
                { !user && <Link className='cursor-pointer text-navbar' to="/register">Register</Link>}
                 {user && <h1 className='cursor-pointer text-navbar' onClick={logout}>Logout</h1>}
            </ul>
            
            </div> 
      </div>
      
      </div>
  )
}

export default Navbar
