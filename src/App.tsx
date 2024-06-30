import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Weight from './pages/Weight';
import Exercise from './pages/Excercise';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/weight" element={<ProtectedRoute component={Weight} />} />
        <Route path="/exercise" element={<ProtectedRoute component={Exercise} />} />
      </Routes>
    </Router>
  );
};

export default App;