import {Store } from '../../Context/Context';

function EmployeeTaskDetails() {
  const employeesData =Store((state) => state.employeesData);


  return (
    <div className="p-5 rounded mt-5 h-48 overflow-auto bg-white shadow">
      <div className="bg-red-500 mb-2 py-3 px-6 flex justify-between items-center rounded font-semibold text-white">
        <h2 className="w-19 text-center font-bold">S.no</h2>
        <h2 className="w-1/5">Employee Name</h2>
        <h5 className="w-1/5 text-center">Active Task</h5>
        <h5 className="w-1/5 text-center ">New Task</h5>
        <h5 className="w-1/5 text-center">Completed Task</h5>
        <h5 className="w-1/5 text-center ">Failed Task</h5>
      </div>
      {employeesData.map((employee, idx) => (
        <div
          key={idx}
          className="bg-gray-400 hover:bg-red-300 transition mb-2 py-2 px-6 flex justify-between items-center rounded"
        > 
          <h5 className="text-lg w-19 text-center font-bold">{idx + 1}</h5>
          <h2 className="text-lg w-1/5 font-medium">{employee.firstName}</h2>
          <h5 className="text-lg w-1/5 text-center font-medium">{employee.taskCounts.active}</h5>
          <h5 className="text-lg w-1/5 text-center font-medium">{employee.taskCounts.newTask}</h5>
          <h5 className="text-lg w-1/5 text-center font-medium">{employee.taskCounts.completed}</h5>
          <h5 className="text-lg w-1/5 text-center font-medium text-red-600">{employee.taskCounts.failed}</h5>
        </div>
      ))}
    </div>
  );
}

export default EmployeeTaskDetails;