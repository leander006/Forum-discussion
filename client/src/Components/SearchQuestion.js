import React from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js'

function SearchQuestion({Search}) {
  const navigate = useNavigate()
  const nav =(e) =>{
    e.preventDefault();
    navigate(`/singleQuestion/${Search._id}`)
  }
  return (
      <div className='flex flex-col border-b-2 mb-3 cursor-pointer' onClick={nav} >
      <div className='flex  pb-6 space-x-3 '>
            <div className='pr-2'>
            <img src={Search?.owner?.profile} alt='image' className=' w-14  h-14 rounded-full mr-3 border border-primary '/>
            </div>
           <div className=''>
           <h1 className='capitalize mt-1 font-sans text-secondary'>{Search?.owner?.username}</h1>
           </div>
           <div className='mt-1 text-purple-600 text-sm '>
              <h1>Added: {format(Search?.createdAt)}</h1>
           </div>
      </div>
  
      <div className='flex '>
                    <div className='pr-4 font-bold'>
                        Reply: {Search?.reply?.length}
                    </div>
                  <div className='flex flex-col'>
                  <div className='question font-bold text-purple-900'>
                  {Search?.content}
                    </div>
                  </div>
            </div>
  
      </div>
  )
}

export default SearchQuestion