import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Support from "./components/Support";
import Subscription from "./components/Subscription";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
};

export default App;
