import { useState } from "react";
import Header from "../others/Header";
import EmployeeTaskDetails from "../others/EmployeeTaskDetails";
import CreateTask from "../others/CreateTask";
import AddEmployee from "../others/AddEmployee";


function AdminDashboard() {
  const [modal, setModal] = useState(null);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-blue-800">
      <Header />

      <div className="px-6 md:px-10 pb-10">
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => setModal("task")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200  hover:shadow-blue-500/40 hover:shadow-xl active:scale-95"
          >
            Create New Task ➕
          </button>

          <button
            onClick={() => setModal("employee")}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200  hover:shadow-emerald-500/40 hover:shadow-xl active:scale-95"
          >
            Add New Employee
          </button>
        </div>

       
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-white font-bold text-lg tracking-wide text-center">
              Employee Overview
            </h2>
          </div>
          <div className="p-4">
            <EmployeeTaskDetails />
          </div>
        </div>
      </div>

   
      {modal && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-50 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
           
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-red-500 hover:text-white text-gray-500 rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-200 font-bold text-lg"
            >
              ✕
            </button>

            {modal === "task" && <CreateTask onClose={() => setModal(null)} />}
            {modal === "employee" && (
              <AddEmployee onClose={() => setModal(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
