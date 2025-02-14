import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex h-screen gap-6 p-6 bg-gradient-to-r from-purple-900 via-purple-950 to-purple-900">
            {/* Sidebar Section */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="h-full w-1/5 bg-gradient-to-b from-purple-800 to-purple-900 shadow-xl rounded-2xl p-6 flex flex-col justify-between border border-purple-700 text-white"
            >
                <Sidebar />
            </motion.div>

            {/* Main Content Area */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full flex-1 bg-gradient-to-br from-purple-800 to-purple-900 shadow-2xl rounded-2xl p-8 border border-purple-700 overflow-auto text-white"
            >
                <Outlet />
            </motion.div>
        </div>
    );
};

export default Home;
