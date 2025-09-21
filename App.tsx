import React from ‘react’;
import { BrowserRouter as Router, Routes, Route, Navigate } from ‘react-router-dom’;
import Login from ‘./components/Login’;
import Dashboard from ‘./components/Dashboard’;
import Support from ‘./components/Support’;
import Subscription from ‘./components/Subscription’;
import Profile from ‘./components/Profile’;
import { UserProvider } from ‘./contexts/UserContext’;

const App: React.FC = () => {
return (
<UserProvider>
<Router>
<div className="bg-white text-black min-h-screen">
<Routes>
<Route path=”/login” element={<Login />} />
<Route path=”/” element={<Dashboard />} />
<Route path=”/support” element={<Support />} />
<Route path=”/subscription” element={<Subscription />} />
<Route path=”/profile” element={<Profile />} />
<Route path=”*” element={<Navigate to="/" replace />} />
</Routes>
</div>
</Router>
</UserProvider>
);
};

export default App;
