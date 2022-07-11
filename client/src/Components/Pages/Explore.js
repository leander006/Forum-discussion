import React, { useContext, useEffect, useState } from 'react'
import ExploreMore from '../ExploreMore'
import Navbar from '../Navbar'
import Followers from '../Followers'
import { Context } from '../../Contexts/ContextProvider'
import axios from "axios"
function Explore() {
  const {user} = useContext(Context)
  const [questions, setQuestions] = useState([])
  const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
      }
    }

    useEffect(() => {
      const getQuestions = async() =>{
    
          try {
              
              const res= await axios.get("http://localhost:3003/api/question",config);
           
            setQuestions(res.data);
              
          } catch (error) {
              console.log(error);
          }
      };
      getQuestions();
   
  },[user])
  console.log(questions);

  return (
    
    <>
    <Navbar/>
    {/* <div className='flex '>
      <div className='left flex-1 h-[calc(100vh-2.5rem)] overflow-y-scroll border  md:p-5 '>
        <ExploreMore name={"leander"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"6"} likecount={"3"} likename={"aadil"} />
        <ExploreMore name={"shiv"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"63"} likecount={"23"} likename={"shiv"} />
        <ExploreMore name={"riya"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"46"} likecount={"83"} likename={"lance"}/>
      </div>
      <div className='right hidden md:flex h-[calc(100vh-2.5rem)] overflow-y-scroll p-6 md:flex-col '>
        <h1 className='mt-4 mb-4 font-mono'>Who is following you </h1>
        <Followers profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} username={"Aadil"} date={"23-4-2022"} follows={false}/>
        <Followers profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} username={"shiv"} date={"10-2-2022"} follows={true}/>
      </div>
    </div> */}
    <div className='flex'>
      
      <div className='left w-3/4  p-1 '>
        <div className='bg-gray-200 w-full h-10 p-2 rounded-md flex '>
          <input type="text" className='bg-slate-50  p-2 w-full rounded-md' placeholder='Search '/>
          <i className="fa-solid fa-magnifying-glass cursor-pointer fa-2xl mt-4 ml-2 "></i>
        </div>
      
          <div className='flex flex-col overflow-y-scroll h-[calc(100vh-6rem)]'>
          { questions?.map((q) => (
            <ExploreMore Explore={q} key={q._id} />
        ))}
          </div>

      </div>

      <div className='right w-1/4 text-center overflow-y-scroll h-[calc(100vh-3.2rem)] '>
            <div className='analysis flex flex-col p-2'>
              
               <h1 className='bg-navbar text-white rounded-md h-12 flex flex-col justify-center cursor-pointer'>Ask Question </h1> 
                <div className='upper flex justify-between p-2'> 
                      <div className='l bg-gray-200 w-44 rounded-md mr-2 h-24 flex flex-col justify-center'>
                          <label>Questions</label>
                          <h1>76</h1>
                      </div>
                      <div className='r bg-blue-400 w-44 rounded-md h-24 flex flex-col justify-center'>
                          <label>Answer</label>
                          <h1>78</h1>
                      </div>
                </div>
                <div className='lower flex justify-between p-2'> 
                <div className='l bg-purple-300 w-44 rounded-md mr-2 h-24 flex flex-col justify-center'>
                          <label>Unanswer</label>
                          <h1>98</h1>
                      </div>
                      <div className='r bg-red-500 w-44  rounded-md h-24 flex flex-col justify-center'>
                          <label>User</label>
                          <h1>89</h1>
                      </div>
                </div>
            </div>
            <div className='flex flex-col'>
            <ExploreMore/>
            <ExploreMore/>
            <ExploreMore/>
          </div>
      </div>
      
    </div>



    </>
  )
}

export default Explore