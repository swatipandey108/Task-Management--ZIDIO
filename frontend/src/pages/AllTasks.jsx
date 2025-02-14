import React, { useState } from "react";  
import Cards from "../components/Cards";
import { IoMdAdd } from "react-icons/io";
import InputData from "../components/InputData";

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 p-8 text-white">
            <div className="w-full flex justify-end px-6 py-4">
                <button 
                    onClick={() => setInputDiv("fixed")}  
                    className="bg-purple-700 hover:bg-purple-600 text-white p-5 rounded-full shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center"
                >  
                    <IoMdAdd className="text-4xl" />
                </button>
            </div>
            
            <Cards home={"true"} setInputDiv={setInputDiv} />
            
            {/* Input Modal */}
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
        </div>
    );
};

export default AllTasks;
