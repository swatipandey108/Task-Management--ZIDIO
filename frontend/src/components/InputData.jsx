import React from 'react';
import { MdClose } from "react-icons/md";

const InputData = ({ inputDiv, setInputDiv }) => {
  return (
    <>
      {/* Background Overlay */}
      <div className={`${inputDiv} fixed top-0 left-0 bg-black opacity-50 h-screen w-full transition-opacity duration-300`} />

      {/* Modal */}
      <div className={`${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full transition-transform duration-300`}>
        <div className="w-2/6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-6 rounded-xl shadow-2xl transform transition-all scale-95 hover:scale-100">
          {/* Close button */}
          <div className="flex justify-end">
            <button className="text-2xl text-white hover:text-gray-300 transition-colors duration-200" onClick={() => setInputDiv("hidden")}>
              <MdClose />
            </button>
          </div>

          {/* Input fields */}
          <input
            type="text"
            placeholder="Enter Task Title"
            name="title"
            className="px-4 py-3 rounded-lg w-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 my-3 transition-all"
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            placeholder="Enter Task Description..."
            className="px-4 py-3 rounded-lg w-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 my-3 transition-all"
          ></textarea>
          <button className="bg-purple-600 hover:bg-purple-500 text-white text-xl px-4 py-3 rounded-lg w-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
