
import { Link } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'


function TrendingQuestions({Trend}) {
  const navigate = useNavigate()
  const nav =(e) =>{
    e.preventDefault();
    navigate(`/singleQuestion/${Trend._id}`)
  }


  return (
    <div className='flex flex-col p-4 w-full border-t-2' >
    <div className='flex  pb-6 space-x-3 '>
          <div className='pr-2'>
          <img src={Trend?.owner?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
          </div>
         <div className=''>
         <h1 className='capitalize mt-1 font-sans text-secondary'>{Trend?.owner?.username}</h1>
         </div>
         <div className='mt-1 text-purple-600 text-sm '>
            <h1>Added: {format(Trend?.createdAt)}</h1>
         </div>
    </div>

    <div className='flex '>
                  <div className='pr-4 font-bold'>
                      Reply: {Trend?.reply?.length}
                  </div>
                <div className='flex flex-col'>
                 <div className='question no-underline cursor-pointer font-bold text-purple-900' onClick={nav}>
                 {Trend?.content}
                  </div>
                </div>
          </div>

    </div>
  )
}

export default TrendingQuestions