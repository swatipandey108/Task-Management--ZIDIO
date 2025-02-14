import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaStar, FaTimesCircle, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-800 shadow-2xl rounded-2xl p-6 border border-purple-700 text-white">
      
      {/* Sidebar Title */}
      <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wider font-serif">
        Zidio Task Manager
      </h1>

      {/* Centered Task List */}
      <div className="flex flex-col gap-5 flex-grow justify-center">
        <Link 
          to="/" 
          className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md"
        >
          <FaTasks /> Task List
        </Link>

        <Link 
          to="/completedTask" 
          className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md"
        >
          <FaCheckCircle /> Completed Task
        </Link>

        <Link 
          to="/importantTask" 
          className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md"
        >
          <FaStar /> Important Task
        </Link>

        <Link 
          to="/incompletedTask" 
          className="flex items-center gap-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 p-4 rounded-xl text-white text-lg font-medium tracking-wide shadow-md"
        >
          <FaTimesCircle /> Incomplete Task
        </Link>
      </div>

      {/* Logout Button at Bottom */}
      <button className="mt-auto bg-red-500 hover:bg-red-600 text-white text-lg font-semibold flex items-center justify-center gap-3 rounded-xl px-6 py-3 w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
        <FaSignOutAlt /> Log Out
      </button>
      
    </div>
  );
};

export default Sidebar;
