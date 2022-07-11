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
                        <h1 className='text-slate-300 text-xl '>Enroll for free</h1>
                        <h1 className='text-2xl mt-1 mb-1'>Register for Forum-Mania</h1>
                        <h2 className='text-slate-300'>Already a member? <Link className='text-secondary' to="/login">Login</Link></h2>

                        <form className='flex justify-center flex-col item-center mt-4' onSubmit={handleSubmit}>
                        {/* {!uploading?<img className='image w-32 h-18 m-auto' src={url?url:"nn.png"} alt='image'></img>: <SpinnerCircular size="90" className='spinner-register' thickness='100'  speed="400" color='red' secondaryColor="grey"/>} */}
                              <label className='mb-1'>Username</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}  required/>
                              <label className='mb-1'>Email</label>
                                 <input className='w-full h-12 mb-4 rounded-md p-3 bg-slate-100' type="email" placeholder='Email' onChange={e=>setEmail(e.target.value)}  required/>
                                 <label className='mb-1'>Password</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}  required/>
                                  {/* <label className='mb-1'>Select Profile Picture</label>
                                 <label className='flex justify-center my-3 cursor-pointer' htmlFor='forFile'><i className="fa-solid fa-2xl fa-plus"></i></label>
                                 <input type="file" type="file" id='forFile' accept='image/png , image/jpg, image/jpeg' style={{display:"none"}} onChange={handleImageValidation}    name="file" required />
                                  <div className="bg-slate-200  flex mt-4 mb-3 rounded-lg hover:bg-slate-100 hover:border">
                                  <button className=' w-full h-10' onClick={uploadImg}>Upload Image</button>
                                  </div> */}
                                 <button className='bg-primary text-white rounded-lg  w-full h-10 hover:bg-blue-500'>Register</button>
                                 <div className=' bg-slate-200  flex mt-4 rounded-lg hover:bg-slate-100 hover:border '>
                                 <i className="fa-brands text-primary fa-2xl fa-google-plus-g m-auto pl-2"></i>
                                 <button className=' w-full h-10'>Register with google</button>
                                 </div>
                        </form>
                  </div>
            </div>
      </div>
      </div>
    </>
  )
}

export default Register