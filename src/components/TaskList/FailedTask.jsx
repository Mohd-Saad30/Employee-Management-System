import React from 'react'

function FailedTask({task}) {
  return (
    <div className="flex flex-col shrink-0 h-[220px] w-[340px] bg-white/95 rounded-3xl p-7 border border-blue-100 ">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-red-500 text-white text-xs rounded-full font-bold px-3 py-1 ">
            {task.category}
          </span>
          <span className="text-gray-500 text-sm font-medium">
           {task.taskDate}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{task.taskTitle}</h2>
        <p className="text-gray-700 text-sm ">
        {task.taskDescription}
        </p>
          <div className='mt-auto'>
            <button   className='w-full bg-red-600 text-white font-semibold py-2 rounded-lg ' disabled>Failed ❌</button>
        </div>
      </div>
      
  )
}

export default FailedTask