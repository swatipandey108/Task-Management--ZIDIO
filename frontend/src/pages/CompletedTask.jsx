import React from 'react';
import Cards from '../components/Cards';
import { motion } from 'framer-motion';

const CompletedTask = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-purple-800 to-purple-500 p-8 flex justify-center"
    >
      <div className="w-full max-w-4xl bg-purple-600 bg-opacity-90 shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Completed Tasks ✅</h2>
        <Cards home={"false"} />  
      </div>
    </motion.div>
  );
};

export default CompletedTask;
