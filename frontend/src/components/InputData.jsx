import React from "react";
import { MdClose } from "react-icons/md";

const InputData = ({ inputDiv, setInputDiv }) => {
  return (
    <>
      {/* Background Overlay */}
      <div
        className={`${inputDiv} fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300`}
      />

      {/* Modal */}
      <div
        className={`${inputDiv} fixed inset-0 flex items-center justify-center transition-all duration-300`}
      >
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
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Task Title"
              name="title"
              className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              placeholder="Enter Task Description..."
              className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
            ></textarea>
          </div>

          {/* Button */}
          <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-lg font-semibold px-4 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105">
          Schedule Task
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
