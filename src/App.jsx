import "./App.css";
import { LoginPage } from "./components/Auth/LoginPage";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

import {Store } from "./Context/Context";

function App() {
  const user =Store((state) => state.user);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>{user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}</>
  );
}

export default App;
