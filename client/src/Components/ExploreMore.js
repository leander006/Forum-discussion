import React, { useState } from 'react'
import Comments from './Comments'
import {format} from "timeago.js"
function ExploreMore({Explore}) {
      const [likes, setLikes] = useState(false)
      const [reply,setReply] = useState([])
      const handleLikes =(e) =>{
            e.preventDefault()
            setLikes(!likes)
      }

// console.log(Explore);

  return (


    <div className='flex flex-col p-4  w-full' >
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
                  <div className='pr-4'>
                      Reply: {Explore?.reply?.length}
                  </div>
                <div className='flex flex-col'>
                <div className='question'>
                {Explore?.content}
                  </div>
                <div className='flex flex-col'>
                { Explore?.reply.map((q) => (
            <ExploreMore  />
            ))}
                </div>
                </div>
          </div>
          <div className='bg-gray-100 p-2 rounded-md flex flex-row'>
                <textarea className='w-full h-14 rounded-md text-purple-500' ></textarea> 
                <i className="fa-solid fa-xl cursor-pointer mt-6 ml-2 fa-paper-plane text-purple-500 hover:text-purple-400" id='button'></i>             
          </div>
    </div>
  )
}

export default ExploreMore