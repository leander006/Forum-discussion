import React from 'react'
import { format } from 'timeago.js';

function Answer({comments}) {
  return (
    <div className='answer flex flex-col my-4  border-b-2'>
            <div className='flex pb-6 space-x-3 '>
                <div className='pr-2'>
                <img src={comments?.username?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
                </div>
               <div className=''>
               <h1 className='capitalize mt-1 font-sans text-secondary'>{comments?.username?.username}</h1>
               </div>
               <div className='mt-1 text-purple-600'>
                  <h1>Added: {format(comments?.createdAt)}</h1>
               </div>
          </div>

          <div className='flex pl-3 pb-4'>
                <div className='flex flex-col '>
                <div className='question font-bold text-purple-900'>
                {comments?.comment}
                  </div>
                </div>
      
          </div>
          <div>

          </div>

    </div>
  )
}

export default Answer