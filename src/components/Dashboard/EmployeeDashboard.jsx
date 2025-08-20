import Header from "../others/Header";
import TaskListNumber from "../others/TaskListNumber";
import Tasks from "../TaskList/Tasks";

function EmployeeDashboard() {
  return (
    <div>
      <div className="p-10 bg-amber-400  h-full ">
        <Header />
        <TaskListNumber />
        <Tasks />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
