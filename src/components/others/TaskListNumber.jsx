import {Store } from "../../Context/Context"

function TaskListNumber() {
  const currentUser =Store((state)=>state.user)
    return (
        <div className='flex mt-10 justify-between gap-7 screen flex-wrap md:flex-nowrap'>
            <div className='rounded-xl w-[40%] py-6 px-9 bg-blue-400 h-40 flex flex-col items-center justify-center'>
                <h2 className='text-3xl font-bold mb-2 border-2 p-1'>{currentUser.taskCounts?.newTask}</h2>
                <h3 className='text-xl font-medium'>New Task 🆕</h3>
            </div>
            <div className='rounded-xl w-[40%] py-6 px-9 bg-green-400 h-40 flex flex-col items-center justify-center'>
                <h2 className='text-3xl font-bold mb-2 border-2 p-1 '>{currentUser.taskCounts?.completed}</h2>
                <h3 className='text-xl font-medium'>Completed Task ✔</h3>
            </div>
            <div className='rounded-xl w-[40%] py-6 px-9 bg-white/95  h-40 flex flex-col items-center justify-center'>
                <h2 className='text-3xl text-black font-bold mb-2 border-2 p-1'>{currentUser.taskCounts?.active}</h2>
                <h3 className='text-xl text-black font-medium'>Accepted Task 👍</h3>
            </div>
            <div className='rounded-xl w-[40%] py-6 px-9 bg-red-600 h-40 flex flex-col items-center justify-center'>
                <h2 className='text-3xl font-bold mb-2 border-2 p-1'>{currentUser.taskCounts?.failed}</h2>
                <h3 className='text-xl font-medium'>Failed Task ❌</h3>
            </div>
        </div>
    )
}

export default TaskListNumber
