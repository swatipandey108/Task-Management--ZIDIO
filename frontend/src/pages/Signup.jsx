import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

          {/* Email Input */}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
          />

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
          />

          <div className="w-full flex flex-col items-center mt-4">
            {/* Signup Button */}
            <button
              disabled={!email || !username || !password}
              className={`${
                email && username && password
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg hover:shadow-xl"
                  : "bg-purple-700 cursor-not-allowed opacity-50"
              } text-white text-lg font-semibold rounded-lg px-6 py-3 w-full transition-all duration-300 ease-in-out`}
            >
              Sign Up
            </button>

            {/* Login Redirect */}
            <Link to="/login" className="text-purple-300 text-sm hover:text-purple-400 hover:underline mt-3 transition-all duration-300 ease-in-out">
              Already have an account? <span className="font-semibold text-purple-400">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
