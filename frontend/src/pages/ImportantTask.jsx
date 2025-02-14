import React from 'react';
import Cards from '../components/Cards';
import { motion } from 'framer-motion';

const ImportantTask = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 p-6 flex flex-col items-center"
    >
      <h2 className="text-white text-3xl font-semibold mb-6">Important Tasks</h2>
      <Cards home={"false"} />
    </motion.div>
  );
};

export default ImportantTask;
