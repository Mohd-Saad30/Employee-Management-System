import { useState } from "react"
import {Store } from "../../Context/Context"


function CreateTask() {
    const addTask=Store(state=>state.addTask)
    const [TaskTitle, setTaskTitle] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [Assignee, setAssignee] = useState('')
    const [category, setCategory] = useState('')
     const [taskDescription, setTaskDescription] = useState('')
 
    const submitHandler = (e) => {
        e.preventDefault();
        const newTask = {
            taskTitle: TaskTitle,
            taskDescription: taskDescription,
            taskDate: taskDate,
            category: category,
            active: false,
            newTask: true, // Set the status for a new task
            completed: false,
            failed: false,
        };
       addTask(Assignee,newTask)
        setTaskTitle('');
        setTaskDate('');
        setAssignee('');
        setCategory('');
        setTaskDescription('');
    }
  return (
    <div className="mt-10 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
                <form className="w-[90%] flex justify-between gap-15 p-10" onSubmit={submitHandler}>
                   
                    <div className="flex flex-col gap-4 w-1/2">
                        <div>
                            <label htmlFor="TaskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                Task Title
                            </label>
                            <input
                                value={TaskTitle}
                                onChange={(e)=>{
                                    setTaskTitle(e.target.value)
                                   
                                }}

                                type="text"
                                id="TaskTitle"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="Date" className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                 value={taskDate}
                                onChange={(e)=>{
                                    setTaskDate(e.target.value)
                                }}
                                type="date"
                                name="Date"
                                id="Date"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="Assign" className="block text-sm font-medium text-gray-700 mb-1">
                                Assign To
                            </label>
                            <input
                                type="text"
                                id="Assign"
                                value={Assignee}
                                onChange={(e)=>{
                                    setAssignee(e.target.value)
                                }}
                                placeholder="Employee name"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <input
                              value={category}
                                onChange={(e)=>{
                                    setCategory(e.target.value)
                                }}
                                type="text"
                                id="category"
                                placeholder="Dev, Design etc"
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-1/2">
                        <div>
                            <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="Description"
                                id="Description"
                                value={taskDescription}
                                onChange={(e)=>{
                                    setTaskDescription(e.target.value)
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:ring-2 focus:ring-blue-400"
                                rows={6}
                            ></textarea>
                        </div>
                        <button
                        type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-black mt-4"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
  )
}

export default CreateTask