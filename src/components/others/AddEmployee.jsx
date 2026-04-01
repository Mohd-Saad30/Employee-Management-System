import { useState } from "react";
import { Store } from "../../Context/Context";

function AddEmployee({ onClose }) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const addEmployee = Store((state) => state.addEmployee);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (employeeName.trim() === "") {
      setMessage({ text: "Please enter a valid employee name.", type: "error" });
      return;
    }
    if (employeePassword.length < 4) {
      setMessage({ text: "Password must be at least 4 characters long.", type: "error" });
      return;
    }

    const result = addEmployee(employeeName, employeeEmail, employeePassword);

    if (result.success) {
      setSubmitted(true);
      setMessage({
        text: `Employee "${employeeName}" added!\nEmail: ${employeeEmail}\nPassword: ${employeePassword}`,
        type: "success",
      });
      setTimeout(() => {
        setSubmitted(false);
        setEmployeeName("");
        setEmployeeEmail("");
        setEmployeePassword("");
        setMessage({ text: "", type: "" });
        if (onClose) onClose();
      }, 2000);
    } else {
      setMessage({ text: result.message, type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
     
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">Add New Employee</h2>
            <p className="text-emerald-100 text-sm mt-0.5">Create a new employee account</p>
          </div>
        </div>
      </div>

   
      <form onSubmit={handleSubmit} className="p-8 space-y-5">

        <div className="space-y-1.5">
          <label htmlFor="newEmployeeName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="text-emerald-500">👤</span> Full Name
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              id="newEmployeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="e.g. John Smith"
              required
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            />
          </div>
        </div>

       
        <div className="space-y-1.5">
          <label htmlFor="newEmployeeEmail" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="text-emerald-500">✉️</span> Email Address
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              id="newEmployeeEmail"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              placeholder="e.g. john@company.com"
              required
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            />
          </div>
        </div>

     
        <div className="space-y-1.5">
          <label htmlFor="newEmployeePassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="text-emerald-500">🔒</span> Password
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              id="newEmployeePassword"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              placeholder="Min. 4 characters"
              required
              className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors text-xs font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-xs text-gray-400 pl-1">Must be at least 4 characters</p>
        </div>

        
        {message.text && (
          <div className={`rounded-xl px-4 py-3 text-sm font-medium whitespace-pre-wrap ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            {message.type === "success" ? "✅ " : "❌ "}{message.text}
          </div>
        )}

   
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
            ${submitted
              ? "bg-emerald-400 scale-95 shadow-emerald-300 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-300 hover:-translate-y-0.5"
            }`}
          disabled={submitted}
        >
          {submitted ? (
            <>✅ Employee Added!</>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Employee
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;