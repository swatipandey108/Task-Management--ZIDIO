import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cards = ({ setInputDiv, Data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Data && Data.length > 0 ? (
        Data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-purple-300 shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105"
          >
            <div>
              <h3 className="text-purple-900 text-2xl font-bold">{items.title}</h3>
              <p className="text-gray-800 my-3 text-lg">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center justify-between">
              <button
                className={`${
                  items.status.toLowerCase() === "complete" ? "bg-green-600" : "bg-red-500"
                } text-white py-2 px-4 rounded-lg font-semibold`}
              >
                {items.status.toLowerCase() === "complete" ? "Completed" : "Incomplete"}
              </button>
              <div className="text-purple-800 text-2xl flex gap-4">
                <button className="hover:text-purple-600 transition-colors duration-200">
                  <CiHeart />
                </button>
                <button className="hover:text-purple-600 transition-colors duration-200">
                  <FaRegEdit />
                </button>
                <button className="hover:text-purple-600 transition-colors duration-200">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-white text-center text-2xl col-span-full">
          No Tasks Found ❌
        </h3>
      )}
    </div>
  );
};

export default Cards;
