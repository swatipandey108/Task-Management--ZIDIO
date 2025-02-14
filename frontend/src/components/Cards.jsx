import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Cards = ({ home, setInputDiv }) => {
  const data = [
    {
      title: 'Exam Preparation',
      desc: "I want to study for my exam",
      status: "Incomplete",
    },
    {
      title: 'Yoga',
      desc: "I have to do yoga for my health",
      status: "Complete",
    },
    {
      title: 'Interview Preparation',
      desc: "I have to prepare for my interview",
      status: "Incomplete",
    },
    {
      title: 'Dance',
      desc: "I have to go to my dance class",
      status: "Incomplete",
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {data.map((items, i) => (
        <div key={i} className="flex flex-col justify-between bg-purple-200 shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
          <div>
            <h3 className="text-purple-900 text-2xl font-bold">{items.title}</h3>
            <p className="text-gray-700 my-3 text-lg">{items.desc}</p>
          </div>
          <div className="mt-4 w-full flex items-center justify-between">
            <button className={`${items.status === 'Incomplete' ? 'bg-red-500' : 'bg-green-500'} text-white py-2 px-4 rounded-lg font-semibold`}>
              {items.status}
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
      ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center text-purple-900 bg-purple-300 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoMdAdd className="text-6xl" />
          <h2 className="font-bold mt-4 text-xl"> Add More Task!</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
