import EmployeeTaskDetails from "../others/EmployeeTaskDetails";
import CreateTask from "../others/CreateTask";
import Header from "../others/Header";
import AddEmployee from "../others/AddEmployee";

function AdminDashboard() {
  return (
    <div className="h-screen w-full p-10 bg-gray-50">
      <Header />
      <CreateTask />
      <AddEmployee/>
      <EmployeeTaskDetails />
    </div>
  );
}

export default AdminDashboard;
