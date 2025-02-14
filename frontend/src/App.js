import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import Login from "./pages/Login";  
import SignUp from "./pages/Signup";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="completedTask" element={<CompletedTask />} />
            <Route path="importantTask" element={<ImportantTask />} />
            <Route path="incompletedTask" element={<IncompletedTask />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
