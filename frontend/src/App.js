import React, { useState } from 'react'
import './App.css'
import LoginForm from './components/Login/login'
import SignupForm from './components/Signup/signup'
import Home from './components/Home/home'
import  {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
