import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { FaTasks, FaCheckCircle, FaStar, FaTimesCircle, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";  
import { authActions } from "../store/auth"; 
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // Logout Function
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };

      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
        setData(response.data.data); 
        console.log("Fetched Tasks:", response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-800 shadow-2xl rounded-2xl p-6 border border-purple-700 text-white">
      
      {/* Sidebar Title */}
      <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wider font-serif">
        Task Control Panel
      </h1>

      {/* Task Navigation Links */}
      <div className="flex flex-col gap-5 flex-grow justify-center">
        <Link to="/" className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md">
          <FaTasks /> Activity Log
        </Link>
        <Link to="/completedTask" className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md">
          <FaCheckCircle /> Accomplished Task
        </Link>
        <Link to="/importantTask" className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md">
          <FaStar /> Top Task
        </Link>
        <Link to="/incompletedTask" className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md">
          <FaTimesCircle /> Ongoing Task
        </Link>
      </div>

      {/* Logout Button */}
      <button 
        className="mt-auto bg-red-500 hover:bg-red-600 text-white text-lg font-semibold flex items-center justify-center gap-3 rounded-xl px-6 py-3 w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl" 
        onClick={logout}  
      >
        <FaSignOutAlt /> Log Out
      </button>
      
    </div>
  );
};

export default Sidebar;
