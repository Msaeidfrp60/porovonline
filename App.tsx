import React from ‘react’;
import { BrowserRouter as Router, Routes, Route, Navigate } from ‘react-router-dom’;
import Login from ‘./components/Login.tsx’;
import Dashboard from ‘./components/Dashboard.tsx’;
import Support from ‘./components/Support.tsx’;
import Subscription from ‘./components/Subscription.tsx’;
import Profile from ‘./components/Profile.tsx’;
import { UserProvider, useUser } from ‘./contexts/UserContext’;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const { user } = useUser();
return user.isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
return (
<div className="bg-white text-black min-h-screen">
<HashRouter>
<Routes>
<Route path=”/login” element={<Login />} />
<Route path=”/” element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path=”/support” element={<Support />} />
<Route path=”/subscription” element={<Subscription />} />
<Route path=”/profile” element={<Profile />} />
<Route path=”*” element={<Navigate to="/" replace />} />
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
};

export default App;
