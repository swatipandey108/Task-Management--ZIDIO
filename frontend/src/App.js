import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import Login from "./pages/Login";  
import SignUp from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";  

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const dispatch = useDispatch();
   useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!localStorage.getItem("id") && !localStorage.getItem("token")) {
      navigate("/login");  // Redirect to login only if user is not logged in
    }
  }, [isLoggedIn, dispatch, navigate]);
 
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4">
      
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
       
    </div>
  );
};

export default App;
