
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import Subscription from './components/Subscription';
import Profile from './components/Profile';
import { UserProvider, useUser } from './contexts/UserContext';

const ProtectedRoute: React.FC = () => {
    const { user } = useUser();
    return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
