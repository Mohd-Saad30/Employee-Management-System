import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";
import {Store } from "../../Context/Context";

function Tasks() {
const currentUser= Store((state)=>state.user)
  return (
    <div
      id="TaskDiv"
      className="h-[50%] mt-7 w-full bg-gradient-to-r from-blue-700  to-blue-400 flex items-center justify-start gap-8 px-8 py-6 overflow-x-auto rounded-2xl shadow-lg"
    >
     {currentUser.tasks.map((task, idx) => {
      if (task.newTask) {
        return <NewTask key={idx} task={task} />;
      }
      if (task.active) {
        return <AcceptTask key={idx} task={task}  />;
      }
      if (task.failed) {
        return <FailedTask key={idx} task={task}  />;
      }
      if (task.completed) {
        return <CompleteTask key={idx} task={task}  />;
      }
      return null; 
    })}
      
    </div>
  );
}

export default Tasks;
