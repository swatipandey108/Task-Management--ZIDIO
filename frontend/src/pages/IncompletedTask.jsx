import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { motion } from "framer-motion";

const IncompletedTask = () => {
  const [incompletedTasks, setIncompletedTasks] = useState([]);

  useEffect(() => {
    const fetchIncompletedTasks = async () => {
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
          task.status?.toLowerCase().trim() !== "complete"
        );

        console.log("Filtered Incomplete Tasks:", filteredTasks);
        setIncompletedTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching incomplete tasks:", error);
      }
    };

    fetchIncompletedTasks();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 p-6 flex justify-center items-center"
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20">
        <h2 className="text-white text-3xl font-semibold text-center mb-4">Incomplete Tasks</h2>
        <Cards home={"false"} Data={incompletedTasks} />
      </div>
    </motion.div>
  );
};

export default IncompletedTask;
