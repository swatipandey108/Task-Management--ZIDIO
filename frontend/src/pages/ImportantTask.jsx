import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { motion } from "framer-motion";

const ImportantTask = () => {
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    const fetchImportantTasks = async () => {
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

        // Assuming there's an "important" flag in your task data
        const filteredTasks = response.data.tasks?.filter(task => task.important === true);

        console.log("Filtered Important Tasks:", filteredTasks);
        setImportantTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching important tasks:", error);
      }
    };

    fetchImportantTasks();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 p-6 flex flex-col items-center"
    >
      <h2 className="text-white text-3xl font-semibold mb-6">⚡ Important Tasks</h2>
      <Cards home={"false"} Data={importantTasks} />
    </motion.div>
  );
};

export default ImportantTask;
