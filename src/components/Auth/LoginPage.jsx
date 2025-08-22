import React, { useState } from "react";
import {Store } from "../../Context/Context";

export const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const login =Store((state) => state.login);
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
    <div className="flex  flex-col items-center  h-screen bg-blue-100 ">
      <header className="w-full flex items-center bg-gradient-to-r from-blue-500 to-blue-700 p-6  rounded-b-xl justify-center">
        <h1 className="text-white text-3xl font-bold">
          Employee Management System
        </h1>
      </header>

      <div className="mt-auto border-2 rounded-xl border-emerald-600 transition duration-150 p-20 bg-white">
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
      <footer className="mt-auto   w-full flex items-center bg-gradient-to-r from-blue-500 to-blue-700 p-6  rounded-b-xl justify-center h-auto">
        <h1 className="text-white text-3xl font-bold">
          Developed by Mohd Saad
        </h1>
      </footer>
    </div>
  );
};
