import EmployeeTaskDetails from "../others/EmployeeTaskDetails";
import CreateTask from "../others/CreateTask";
import Header from "../others/Header";

function AdminDashboard() {
  return (
    <div className="h-screen w-full p-10 bg-gray-50">
      <Header />
      <CreateTask />
      <EmployeeTaskDetails />
    </div>
  );
}

export default AdminDashboard;
