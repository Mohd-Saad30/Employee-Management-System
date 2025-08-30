import { useState } from "react";
import { Store } from "../../Context/Context";

function AddEmployee() {
    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeePassword, setEmployeePassword] = useState("");
    const [message, setMessage] = useState(""); 
    const addEmployee = Store((state) => state.addEmployee);

    const handleSubmit = (e) => {
      e.preventDefault();
      setMessage("");

      if (employeeName.trim() === "") {
        setMessage("Please enter a valid employee name.");
        return;
      }
      if (employeePassword.length < 4) {
        setMessage("Password must be atleast 4 character long.");
        return;
      }
      const success = addEmployee(
        employeeName,
        employeeEmail,
        employeePassword
      );
      if (success.success) {
        setMessage(`Employee '${employeeName}' was added successfully!
                Email id: ${employeeEmail}
                Password : ${employeePassword}`);
        setEmployeeName("");
        setEmployeeEmail("");
        setEmployeePassword("");
      } else {
        setMessage(success.message);
      }
    };
    
    
    if (message) {
      setTimeout(() => setMessage(""), 10000);
    }

    return (
        <div className="p-8 bg-white rounded-lg  m-auto mt-10 max-w-2xl w-[90%] ">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create New Employee</h2>
           
                <form onSubmit={handleSubmit} className=" space-y-2">
                    <label
                        htmlFor="newEmployeeName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        New Employee Name
                    </label>
                    <input
                        type="text"
                        id="newEmployeeName"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        placeholder="Enter the Employee Name"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                      <label
                        htmlFor="newEmployeeEmail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        New Employee Email
                    </label>
                    <input
                        type="email"
                        id="newEmployeeEmail"
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        required
                        placeholder="Enter the Employee Email"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     <label
                        htmlFor="newEmployeePassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        New Employee Password
                    </label>
                   
                    <input
                        type="password"
                        id="newEmployeePassword"
                        value={employeePassword}
                        onChange={(e) => setEmployeePassword(e.target.value)}
                         required
                        placeholder="Enter the Password"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                
                <button
                   
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 "
                >
                    Add
                </button>
                </form>
                    
        
            {message && (
                <p className={`mt-3 text-sm text-center whitespace-pre-wrap ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                    
                    
                </p>
            )}
        </div>
    );
}


export default AddEmployee;