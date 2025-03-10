import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
const Login = () => {
  const [Data, setData] = useState({
    username: "",
    password: ""
  });

  const history = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value
    });
  };
  
  const submit = async () => {
    try {
      if (!Data.username || !Data.password) {
        alert("Please fill in all fields.");
      } else { 
        const response = await axios.post("http://localhost:1000/api/v1/login", Data);
        setData({ username: "", password: "" });
        console.log(typeof console);

        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-950 to-black">
      <div className="relative w-96">
        <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>

        <div className="relative bg-gradient-to-r from-purple-800 via-purple-900 to-black shadow-2xl rounded-2xl p-8 w-full text-center z-10 border border-purple-700">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
            Welcome Back
          </h2>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={Data.username} // Fixed value
            onChange={change}
            className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={Data.password} // Fixed value
            onChange={change}
            className="bg-purple-700 text-white rounded-lg px-4 py-3 my-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600 transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
          />

          <div className="w-full flex flex-col items-center mt-4">
            {/* Login Button */}
            <button
              disabled={!Data.username || !Data.password} // Fixed usage
              onClick={submit} 
              className={`${
                Data.username && Data.password
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg hover:shadow-xl"
                  : "bg-purple-700 cursor-not-allowed opacity-50"
              } text-white text-lg font-semibold rounded-lg px-6 py-3 w-full transition-all duration-300 ease-in-out`}
            >
              Login
            </button>

            {/* Sign Up Link */}
            <Link to="/signup" className="text-purple-300 text-sm hover:text-purple-400 hover:underline mt-3 transition-all duration-300 ease-in-out">
              Don't have an account? <span className="font-semibold text-purple-400">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
