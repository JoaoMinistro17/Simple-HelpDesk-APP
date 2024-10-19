import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/Auth/AuthContext';

import Login from './Components/Auth/Login';
import Profile from './Components/Profile';
import Home from './Components/Home';
import CreateTicket from './Components/CreateTicket';
import EditTicket from './Components/EditTicket';

function App() {

  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/edit-ticket" element={<PrivateRoute component={EditTicket} />} />
            <Route path="/create-ticket" element={<PrivateRoute component={CreateTicket} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/login" />;
};

export default App;