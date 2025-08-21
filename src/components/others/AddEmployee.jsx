import { useState } from "react";
import { Store } from "../../Context/Context";

function AddEmployee() {
    const [employeeName, setEmployeeName] = useState("");
    const [message, setMessage] = useState(""); 
    const addEmployee = Store((state) => state.addEmployee);

    const handleClick = () => {
       
        setMessage("");

        if (employeeName.trim() === "") {
            setMessage("Please enter a valid employee name.");
            return;
        }
        const success = addEmployee(employeeName);
        if (success) {
            setMessage(`Employee '${employeeName}' was added successfully!
                Email id: ${employeeName.toLowerCase()}@example.com`);
        } else {
            setMessage(`An employee named '${employeeName}' already exists.`);
        }
        setEmployeeName("");
    };
    
    
    if (message) {
        setTimeout(() => setMessage(""), 7000);
    }

    return (
        <div className="p-4 bg-gray-50 rounded-lg  mx-auto mt-10 ">
            <div className="flex items-end gap-4">
                <div className="flex-1">
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
                </div>
                <button
                    onClick={handleClick}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 w-3xs"
                >
                    Add
                </button>
            </div>
           
            {message && (
                <p className={`mt-3 text-sm whitespace-pre-wrap ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                    
                    
                </p>
            )}
        </div>
    );
}


export default AddEmployee;