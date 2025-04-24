import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { motion } from "framer-motion";

const CompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        const filteredTasks = response.data.tasks?.filter(task => 
          task.status?.toLowerCase().trim() === "complete"
        );

        console.log("Filtered Completed Tasks:", filteredTasks);
        setCompletedTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    fetchCompletedTasks();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 p-8 flex justify-center"
    >
      <div className="w-full max-w-5xl bg-purple-800 bg-opacity-90 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          ✅ Completed Tasks
        </h2>
        <Cards home={"false"} Data={completedTasks} />
      </div>
    </motion.div>
  );
};

export default CompletedTask;
