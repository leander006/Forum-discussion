import React, { useContext, useEffect, useState } from 'react'

import {format} from "timeago.js"
import Reply from './Reply'

import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { Context } from '../Contexts/ContextProvider';
function ExploreMore({Explore}) {
const {answer, setAnswer} = useContext(Context)
 
  const toast = useToast()
  const Id = Explore._id

const config ={
  headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
  }
}


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:3003/api/reply/"+Id,{
        content:answer
      },config);
      
    toast({
      description: "Answered successfully",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
setAnswer("")
    } catch (err) {
      console.log(err);
      return toast({
        description: err?.response?.data,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  return (


    <div className='flex flex-col p-4  w-full  border-b-2' >
          <div className='flex pb-6 space-x-3 '>
                <div className='pr-2'>
                <img src={Explore?.owner?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
                </div>
               <div className=''>
               <h1 className='capitalize mt-1 font-sans text-secondary'>{Explore?.owner?.username}</h1>
               </div>
               <div className='mt-1 text-purple-600'>
                  <h1>Added: {format(Explore?.createdAt)}</h1>
               </div>


          </div>
      
          <div className='flex pl-3 pb-4 '>
                  <div className='pr-4 font-bold'>
                      Reply: {Explore?.reply?.length}
                  </div>
                <div className='flex flex-col'>
                <div className='question font-bold text-purple-900'>
                {Explore?.content}
                  </div>
                <div className='flex flex-col mt-7 '>
                { Explore?.reply.map((r) => (
                  <Reply Reply={r} key={r._id} />
            ))}
                </div>
                </div>
          </div>
          <h1 className='my-3'>Write your answers</h1>
          <div className='bg-gray-100 p-2 rounded-md flex flex-row'>
                <textarea className='w-full h-10 rounded-md p-1 text-purple-500' value={answer} onChange={e=>setAnswer(e.target.value)} ></textarea> 
                <i className="fa-solid fa-xl cursor-pointer mt-6 ml-2 fa-paper-plane text-purple-500 hover:text-purple-400" id='button' onClick={handleSubmit}></i>             
          </div>
    </div>
  )
}

export default ExploreMore