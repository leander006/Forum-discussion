import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { SpinnerCircular } from 'spinners-react';
function Register() {


      const navigate = useNavigate();
      const [username,setUsername]=useState("");
      const [password,setPassword]=useState("");
      const [email, setEmail] = useState("");
    
      const [img, setImg] = useState(null);
      const [url, setUrl] = useState("");
      const [uploading, setUploading] = useState(false);
      const toast = useToast()
      


const handleImageValidation = async (e) =>{
    const file = e.target.files[0]
    if(file.size>1048576)
    {
      setImg(null)
      return toast({

        description: "Cannot upload image",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
    else{
      setImg(file)
    }
}


const uploadImg = async (e) =>{
      e.preventDefault()
      if(!img)
      {
        setUrl("")
        return
      }
      const data = new FormData();
      data.append("file",img)
      data.append("upload_preset",'blogwebsite')
      setUploading(true)
      fetch("https://api.cloudinary.com/v1_1/dj-sanghvi-college/image/upload",{
        method:'post',
        body:data
      }).then((res) => res.json())
        .then((data) =>{
          setUploading(true)
          setUrl(data.url)
          toast({
    
            description: "image upload successfully",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setUploading(false)
        }).catch((err) =>{
          setUploading(false)
          console.log(err);
        })
      }

      const handleSubmit = async(e) => {

            e.preventDefault();
        
            
            try {
              await axios.post("http://localhost:3003/api/auth/register", {
                username,
                email,
                password,
                profile:url
              });
        
              toast({
        
                description: "Login successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              navigate('/login');
            } catch (err) {
              toast({  
        
                description: err,
                status: 'warning',
                duration: 5000,
                isClosable: true,
              })
            }
          };
        
      



  return (
    <>
    <Navbar/>
      <div className="flex justify-center h-[calc(100vh-2.5rem)] w-screen bg-gradient-to-r from-purple-300 to-blue-200 " >
      <div className='right flex justify-center items-center '>
            <div className='flex  w-80 bg-white rounded-lg lg:w-[766px] md:w-[600px] md:justify-center md:pt-[80px] lg:pt-[10px] '>
                  <div className='flex flex-col w-full p-5'>
                        <h1 className='text-primary text-xl '>Enroll for free</h1>
                        <h1 className='text-2xl mt-1 mb-1'>Register for Forum-Mania</h1>
                        <h2 className='text-primary'>Already a member? <Link className='text-secondary' to="/login">Login</Link></h2>

                        <form className='flex justify-center flex-col item-center mt-4' onSubmit={handleSubmit}>
                              <label className='mb-1'>Username</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}  required/>
                              <label className='mb-1'>Email</label>
                                 <input className='w-full h-12 mb-4 rounded-md p-3 bg-slate-100' type="email" placeholder='Email' onChange={e=>setEmail(e.target.value)}  required/>
                                 <label className='mb-1'>Password</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}  required/>
                                 <button className='bg-primary text-white rounded-lg  w-full h-10 hover:bg-blue-500'>Register</button>
                        </form>
                  </div>
            </div>
      </div>
      </div>
    </>
  )
}

export default Register