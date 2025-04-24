import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

const InputData = ({ inputDiv, setInputDiv, fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    desc: "",
    important: false, // Default value for importance
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post("http://localhost:1000/api/v2/add-task", taskData, { headers });

      console.log("Task Added:", response.data);

      // Close input modal
      setInputDiv("hidden");

      // Refresh tasks list
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div className={`${inputDiv} fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300`} />

      {/* Modal */}
      <div className={`${inputDiv} fixed inset-0 flex items-center justify-center transition-all duration-300`}>
        <div className="w-2/6 bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-8 rounded-2xl shadow-2xl transform transition-all scale-95 hover:scale-100">
          
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="text-3xl text-white hover:text-gray-300 transition-colors duration-200"
              onClick={() => setInputDiv("hidden")}
            >
              <MdClose />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            Assign New Task
          </h2>

          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
              required
            />
            <textarea
              name="desc"
              value={taskData.desc}
              onChange={handleChange}
              placeholder="Enter Task Description..."
              className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
              required
            ></textarea>

            {/* Important Task Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="important"
                checked={taskData.important}
                onChange={handleChange}
                className="w-5 h-5 text-purple-500 focus:ring-purple-400"
              />
              <label className="text-white">Mark as Important</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-lg font-semibold px-4 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              Schedule Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
