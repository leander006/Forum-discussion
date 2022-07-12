import React, { useContext, useEffect, useState } from 'react'
import ExploreMore from '../ExploreMore'
import Navbar from '../Navbar'
import { Context } from '../../Contexts/ContextProvider'
import axios from "axios"
import TrendingQuestions from '../TrendingQuestions'
import { useToast } from '@chakra-ui/react'
import SearchQuestion from '../SearchQuestion'
function Explore() {
  const {questions,setQuestions} = useContext(Context)
  const [answer, setAnswer] = useState(null)
  const [unanswer, setUnanswer] = useState(null)
  const [activeUsers, setactiveUsers] = useState(null)
  const [totalQues, setTotalQues] = useState(null)
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [question, setQuestion] = useState("")
  const [results, setResults] = useState([])
  const [name, setName] = useState("")
  const toast = useToast()
  const click =(e) =>{
    e.preventDefault();
    setVisible(!visible)
  }

  const {user} = useContext(Context)
  const [particular, setParticular] = useState([])
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user?.token}`
    }
  }

  useEffect(() => {
    const getQuestions = async() =>{
  
        try {
            
            const res= await axios.get("http://localhost:3003/api/question/trending",config);
         
            setParticular(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };
    getQuestions();
 
},[])

useEffect(() => {
  const getStats = async() =>{

      try {
          
          const res= await axios.get("http://localhost:3003/api/question/answer");
       
          setAnswer(res.data);
          const req= await axios.get("http://localhost:3003/api/question/unanswer");
       
          setUnanswer(req.data);

          const resond= await axios.get("http://localhost:3003/api/user");
          setactiveUsers(resond.data.length);

          const question= await axios.get("http://localhost:3003/api/question");
          setTotalQues(question.data.length);
          
          
      } catch (error) {
          console.log(error);
      }
  };
  getStats();

},[])

const handleSubmit = async(e) => {

  e.preventDefault();
  setVisible(!visible)
  try {
    const {data} = await axios.post("http://localhost:3003/api/question",{
      content:question
    },config);
    setQuestions([data,...questions])
  toast({
    description: "Ask question successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })

  } catch (err) {
    return toast({
      description: err?.response?.data,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    })
  }
};

const search = async(e) => {
  setShow(!show)
  e.preventDefault();
  try {
    const {data} = await axios.get(`http://localhost:3003/api/question/search?name=${name}`,config);
    console.log(data);
    setResults(data);
  toast({
    description: "This are results",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })

  } catch (err) {
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
    <div className='flex -z-50 bg-purple-50'>
      
      <div className='left w-3/4  p-1 px-24'>
        <form className='bg-gray-200 w-full h-10 p-2 rounded-md flex ' onSubmit={search}>
          <input type="text" className='bg-slate-50  p-2 w-full rounded-md' value={name} placeholder='Search' onChange={e=>setName(e.target.value)} required/>
          <button className="fa-solid fa-magnifying-glass cursor-pointer fa-2xl  ml-2 " ></button>
        </form>
          <div className='flex flex-col border m-3 rounded-md bg-gray-50 overflow-y-scroll h-[calc(100vh-7rem)]'>
          { questions?.map((q) => (
            <ExploreMore Explore={q} key={q._id} />
        ))}
          </div>

      
      </div>

      <div className='right w-1/4 text-center overflow-y-scroll h-[calc(100vh-3.2rem)] border p-3 mr-4 bg-gray-100 mt-2'>
            <div className='analysis flex flex-col p-2'>
              
               <h1 className='bg-navbar text-white rounded-md h-12 flex flex-col justify-center cursor-pointer' onClick={click}>Ask Question </h1> 
                <div className='upper flex justify-between p-2'> 
                      <div className='l bg-gray-200 w-44 rounded-md mr-2 h-24 flex flex-col justify-center'>
                          <label>Questions</label>
                          <h1>{totalQues}</h1>
                      </div>
                      <div className='r bg-blue-400 w-44 rounded-md h-24 flex flex-col justify-center'>
                          <label>Answer</label>
                          <h1>{answer}</h1>
                      </div>
                </div>
                <div className='lower flex justify-between p-2'> 
                <div className='l bg-purple-300 w-44 rounded-md mr-2 h-24 flex flex-col justify-center'>
                          <label>Unanswer</label>
                          <h1>{unanswer}</h1>
                      </div>
                      <div className='r bg-red-500 w-44  rounded-md h-24 flex flex-col justify-center'>
                          <label>User</label>
                          <h1>{activeUsers}</h1>
                      </div>
                </div>
            </div>
            <div className='flex flex-col '>
           <h1 className='text-lg font-bold text-secondary'>Trending Questions</h1>
            { particular?.map((t) => (
             <TrendingQuestions Trend={t} key={t._id} />
        ))}
          </div>
      </div>

      {show && <div className=' ml-72 w-80 bg-slate-200 h-96 fixed mt-12 border z-50 p-3 overflow-y-scroll'>
    {results.map((r) =>(
            <SearchQuestion Search={r} key={r._id}/>
          ))}
    </div>}

      {visible &&<div className="flex fixed ml-80 justify-center z-50  m-auto mt-7" >
      <div className='right flex justify-center items-center '>
            <div className='flex w-full bg-white rounded-lg  ' >
                  <div className='flex flex-col w-full p-5 bg-blue-200'>
                        <h2 className='text-black'>Ask your question</h2>

                        <form className='flex justify-center flex-col item-center mt-4' >
                                 <textarea className=' w-80 mb-3  h-24 rounded-md p-3 bg-slate-100' onChange={e=>setQuestion(e.target.value)} placeholder='Ask question'/>
                                 <button className='bg-primary text-white rounded-lg  w-full h-10 hover:bg-purple-500' onClick={handleSubmit}>Ask </button>
                        </form>
                  </div>
            </div>
      </div>
      </div>}
     
      
    </div>


  
    


    </>
  )
}

export default Explore