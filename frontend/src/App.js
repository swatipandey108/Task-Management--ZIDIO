import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token && id) {
      dispatch(authActions.login({ token, id }));
    }
  }, [dispatch]);

  
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/signup" && location.pathname !== "/login") {
      navigate("/signup", { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        {isLoggedIn && (
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="completedTask" element={<CompletedTask />} />
            <Route path="importantTask" element={<ImportantTask />} />
            <Route path="incompletedTask" element={<IncompletedTask />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
