import React, { useState } from "react";
import { AuthStore } from "../../Context/AuthContext";

export const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const login = AuthStore((state) => state.login);
  const submitHandler = (e) => {
    e.preventDefault();

    const successful_login = login(email, password);
    if (!successful_login) {
      alert("Invalid credentials. Please try again.");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border-2 rounded-xl border-emerald-600 p-20">
        <form
          className="flex items-center justify-center flex-col"
          onSubmit={submitHandler}
        >
          <input
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Enter Your Password"
          />
          <button className="mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
