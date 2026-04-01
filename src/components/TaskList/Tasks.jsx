import { useState } from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";
import { Store } from "../../Context/Context";
import NoTask from "./NoTask";

function Tasks() {
  const currentUser = Store((state) => state.user);
  const [filter, setFilter] = useState("all");

  const tasks = currentUser?.tasks || [];


  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "newTask") return task.newTask;
    if (filter === "active") return task.active;
    if (filter === "completed") return task.completed;
    if (filter === "failed") return task.failed;
    return true;
  });

  return (
    <div className="w-full">
      
      <div className="flex gap-3 overflow-x-auto pb-4 mt-7 no-scrollbar">
        {["all", "newTask", "active", "completed", "failed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold capitalize border transition-all shrink-0 ${
              filter === type
                ? "bg-white text-black border-white"
                : "text-white border-white/30 hover:bg-white/10"
            }`}
          >
            {type === "newTask" ? "New" : type}
          </button>
        ))}
      </div>

      <div
        id="TaskDiv"
        className="
          flex 
          flex-col md:flex-row             
          items-center justify-start 
          gap-8 
          w-full 
          mt-2
          bg-gradient-to-r from-slate-800 via-blue-900 to-blue-800 
          px-8 py-6 
          overflow-x-auto  shadow-lg
        "
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, idx) => {
            if (task.newTask) return <NewTask key={idx} task={task} />;
            if (task.active) return <AcceptTask key={idx} task={task} />;
            if (task.failed) return <FailedTask key={idx} task={task} />;
            if (task.completed) return <CompleteTask key={idx} task={task} />;
            return null;
          })
        ) : (
          
          <div className="w-full text-center py-10">
            <NoTask/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;