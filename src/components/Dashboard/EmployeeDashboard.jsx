import Header from "../others/Header";
import TaskListNumber from "../others/TaskListNumber";
import Tasks from "../TaskList/Tasks";

function EmployeeDashboard() {
  return (
    <div>
      <div className="bg-gradient-to-r from-slate-500 via-blue-900 to-blue-500 h-full ">
        <Header />
        <TaskListNumber />
        <Tasks />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
