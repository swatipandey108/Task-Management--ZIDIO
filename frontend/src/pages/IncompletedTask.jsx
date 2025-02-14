import React from 'react';
import Cards from '../components/Cards';
import { motion } from 'framer-motion';

const IncompletedTask = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 p-6 flex justify-center items-center"
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20">
        <h2 className="text-white text-3xl font-semibold text-center mb-4">Incomplete Tasks</h2>
        <Cards home={"false"} />
      </div>
    </motion.div>
  );
};

export default IncompletedTask;
