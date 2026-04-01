import "./App.css";
import { Routes,Route,Navigate } from "react-router";
import { LoginPage } from "./components/Auth/LoginPage";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import HomePage from "./components/Dashboard/HomePage"
import {Store } from "./Context/Context";

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
  const user = Store((state) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
     
     />

      <Route
        path="/login/:role"
        element={
          user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/employee"} />
          ) : (
            <LoginPage />
          )
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
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
      <Route
        path="*"
        element={
          <div className="bg-red-500 w-dvw h-dvh flex flex-col justify-center items-center">
            <h1 className="font-black text-5xl">Sorryyyyy.....</h1>
            <h2 className="font-black text-5xl">Page not found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
