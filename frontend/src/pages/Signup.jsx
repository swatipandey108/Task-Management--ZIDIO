import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [Data, setData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value
    });
  };

  const submit = async () => {
    // Check if any field is empty
    if (!Data.username || !Data.email || !Data.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1000/api/v1/signup", Data);
      alert("Signup Successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-950 to-black">
      <div className="relative w-96">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>

        {/* Signup Form */}
        <div className="relative bg-gradient-to-r from-purple-800 via-purple-900 to-black shadow-2xl rounded-2xl p-8 w-full text-center z-10 border border-purple-700">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
            Create an Account
          </h2>

          {/* Signup Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={Data.email}
              onChange={change}
              className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
              required
            />

            {/* Username Input */}
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={Data.username}
              onChange={change}
              className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
              required
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={Data.password}
              onChange={change}
              className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
              required
            />

            <div className="w-full flex flex-col items-center mt-4">
              {/* Signup Button */}
              <button
                type="button"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg hover:shadow-xl text-white text-lg font-semibold rounded-lg px-6 py-3 w-full transition-all duration-300 ease-in-out"
                onClick={submit}
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <Link to="/login" className="text-purple-300 text-sm hover:text-purple-400 hover:underline mt-3 transition-all duration-300 ease-in-out">
            Already have an account? <span className="font-semibold text-purple-400">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
