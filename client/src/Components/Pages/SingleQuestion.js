import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'timeago.js';
import { Context } from '../../Contexts/ContextProvider';

import Navbar from '../Navbar';
import Reply from '../Reply';

function SingleQuestion() {

      const {QuestionId} = useParams();
      const {answer, setAnswer} = useContext(Context)
      const [question, setQuestion] = useState({})
      const [replies, setReplies] = useState([])
      const {user}= useContext(Context)
      const navigate = useNavigate()
      const toast = useToast()
      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user?.token}`
            }
          }

      useEffect(() => {
            const getQuestion = async() =>{
                const {data} = await axios.get("http://localhost:3003/api/question/particular/"+QuestionId,config)
                console.log(data);
                  setQuestion(data);
                  setReplies(data.reply)
            }
            getQuestion ()
          
          },[])
          const handleSubmit = async(e) => {
            e.preventDefault();
            try {
              const {data} = await axios.post("http://localhost:3003/api/reply/"+QuestionId,{
                content:answer
              },config);
              
            toast({
              description: "Answered successfully",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            
        setAnswer("")
        navigate("/explore")
            } catch (err) {
              console.log(err);
              return toast({
                description: err?.response?.data,
                status: 'warning',
                duration: 5000,
                isClosable: true,
              })
            }
          };
        
  return (
        <>
             <Navbar/>
             <div className='flex flex-col  m-auto p-6 bg-gray-100 h-[calc(100vh-5rem)] overflow-y-scroll  w-6/12 mt-3 border' >
          <div className='flex pb-6 space-x-3 '>
                <div className='pr-2'>
                <img src={question?.owner?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
                </div>
               <div className=''>
               <h1 className='capitalize mt-1 font-sans text-secondary'>{question?.owner?.username}</h1>
               </div>
               <div className='mt-1 text-purple-600'>
                  <h1>Added: {format(question?.createdAt)}</h1>
               </div>


          </div>
      
          <div className='flex pl-3 pb-4 '>
                  <div className='pr-4 font-bold'>
                      Reply: {question?.reply?.length}
                  </div>
                <div className='flex flex-col'>
                <div className='question font-bold text-purple-900'>
                {question?.content}
                  </div>
                <div className='flex flex-col mt-7 '>
                { replies?.map((r) => (
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
    </>
   
  )
}

export default SingleQuestion