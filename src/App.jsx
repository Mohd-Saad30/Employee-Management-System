import "./App.css";
import { Routes,Route,Navigate } from "react-router";
import { LoginPage } from "./components/Auth/LoginPage";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import HomePage from "./components/Dashboard/HomePage"

import {Store } from "./Context/Context";


const InitialRedirect = () => {
  const user = Store((state) => state.user); 
  
  if (user) {
  
    return <Navigate to={user.role === "admin" ? "/admin" : "/employee"} replace />;
  }

  return <Navigate to="/" replace />;
};


const ProtectedRoute =({children,allowedRoles})=>{
   const user = Store((state) => state.user); 
     if (!user) {
       return <Navigate to="/" replace />;
     }

     if (allowedRoles && !allowedRoles.includes(user.role)) {
   
         return <Navigate to={user.role === "admin" ? "/admin" : "/employee"} replace />;
       }

       return children;
};

function App() {
  return (
    <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/login/:role" element={<LoginPage />} />
      <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard/>
        </ProtectedRoute>
      }
      />
       <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
        
      />
      <Route path="/" element={<InitialRedirect/>}/>
    </Routes>
  );
}

export default App;
