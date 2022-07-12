import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { Context } from '../Contexts/ContextProvider'
import Answer from './Answer'

function Reply({Reply}) {

const {user} = useContext(Context)

const [reply, setReply] = useState("")

const Id = Reply._id
const toast = useToast()
const navigate = useNavigate()

const config ={
  headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${user?.token}`
  }
}


const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const {data} = await axios.post("http://localhost:3003/api/reply/comment/"+Id,{
      content:reply
    },config);
  toast({
    description: "Comment added successfully",
    status: 'success',
    duration: 2000,
    isClosable: true,
  })
  setReply("")
  navigate("/explore")
  } catch (err) {
    return toast({
      description: err?.response?.data,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
  }
};


  return (
      <div className='flex flex-col my-4'>
      <div className='flex pb-6 space-x-3 '>
                <div className='pr-2'>
                <img src={Reply?.username?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
                </div>
               <div className=''>
               <h1 className='capitalize mt-1 font-sans text-secondary'>{Reply?.username?.username}</h1>
               </div>
               <div className='mt-1 text-purple-600'>
                  <h1>Added: {format(Reply?.createdAt)}</h1>
               </div>


          </div>

          <div className='flex pl-3 pb-4'>
                  <div className='pr-4 font-bold '>
                      Comments: {Reply?.comments?.length}
                  </div>
                <div className='flex flex-col '>
                <div className='question font-bold text-purple-900'>
                {Reply?.reply}
                  </div>
                <div className='flex flex-col'>
                {Reply?.comments?.map((c) => (
                  <Answer comments={c} key={c._id}/>
                ))}
                </div> 

                </div>
      
          </div>
          <h1 className='my-3'>Reply on comment</h1>
          <div className='bg-gray-100 p-2  rounded-md flex flex-row' >
                
                <textarea className='w-full h-10 rounded-md p-1 text-purple-500' value={reply} onChange={e=>setReply(e.target.value)} ></textarea> 
                <i className="fa-solid fa-xl cursor-pointer mt-6 ml-2 fa-paper-plane text-purple-500 hover:text-purple-400" id='button' onClick={handleSubmit}></i>             
          </div>
      </div>
  )
}

export default Reply