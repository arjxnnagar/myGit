import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";

import  useAuth  from "./context/useAuth.jsx";

const App = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!currentUser && userId) {
      setCurrentUser(userId);
    }

    if (!userId && !["/login", "/signup"].includes(location.pathname)) {
      navigate("/login");
    }
    if (
      userId &&
      (location.pathname == "/login" || location.pathname == "/signup")
    ) {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser, location.pathname]);

  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
};

export default App;
