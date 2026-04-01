import { useState } from "react";
import { Store, useAdminEmployees } from "../../Context/Context";

function CreateTask({ onClose }) {
  const employeesData = useAdminEmployees();
  const addTask = Store((state) => state.addTask);
  const [TaskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [Assignee, setAssignee] = useState("");
  const [category, setCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      taskTitle: TaskTitle,
      taskDescription: taskDescription,
      taskDate: taskDate,
      category: category,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };
    addTask(Number(Assignee), newTask);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTaskTitle("");
      setTaskDate("");
      setAssignee("");
      setCategory("");
      setTaskDescription("");
      if (onClose) onClose();
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
     
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">Create New Task</h2>
            <p className="text-blue-200 text-sm mt-0.5">Assign a task to an employee</p>
          </div>
        </div>
      </div>

      
      <form onSubmit={submitHandler} className="p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

       
          <div className="space-y-1.5">
            <label htmlFor="TaskTitle" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="text-blue-500">📌</span> Task Title
            </label>
            <input
              value={TaskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Revamp Homepage UI"
              type="text"
              id="TaskTitle"
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

      
          <div className="space-y-1.5">
            <label htmlFor="Date" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="text-blue-500">📅</span> Due Date
            </label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              type="date"
              id="Date"
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="Assign" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="text-blue-500">👤</span> Assign To
            </label>
            <select
              id="Assign"
              value={Assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:border-blue-500 transition-colors text-sm bg-white"
            >
              <option value="" disabled>Select an employee</option>
              {employeesData.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  #{employee.id} — {employee.firstName}
                </option>
              ))}
            </select>
          </div>

         
          <div className="space-y-1.5">
            <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="text-blue-500">🏷️</span> Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="category"
              placeholder="e.g. Design, Dev, Meeting"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

       
        <div className="space-y-1.5">
          <label htmlFor="Description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="text-blue-500">📝</span> Description
          </label>
          <textarea
            id="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Describe the task in detail..."
            rows={4}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
          />
        </div>

      
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
            ${submitted
              ? "bg-emerald-500 scale-95 shadow-emerald-300"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-300 hover:-translate-y-0.5"
            }`}
        >
          {submitted ? (
            <>✅ Task Created!</>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;