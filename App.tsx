import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Support from "./components/Support";
import Subscription from "./components/Subscription";
import UserProvider from "./contexts/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
