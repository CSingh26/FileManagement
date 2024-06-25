import React from 'react'
import './App.css'
import LoginForm from './components/Login/login'
import SignupForm from './components/Signup/signup'
import Home from './components/Home/home'
import Profile from './components/Profile/userProfile'
import ForgotPwd from './components/ForgotPassword/forgotpwd'
import ResetPassword from './components/ForgotPassword/resetpassword'
import Dashboard from './components/Dashboard/dashboard'
import ProtectedRoutes from './context/protectedRoutes'
import { AuthProvider } from './context/authContext'
import  {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
      <Router>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>
          <Route path='/forgot-password' element={<ForgotPwd />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
