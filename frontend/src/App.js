import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/header'
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
        <Route path="/" element={<LoginForm />} />
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
