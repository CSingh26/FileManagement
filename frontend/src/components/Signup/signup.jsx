import React, { useState } from "react"
import Header from "../Header/header"
import './signup.css'
import { Link, useNavigate } from "react-router-dom"
import server from "../../utils/axios"

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validatePwd = (password) => {
    const lenChk = password.length >= 8
    const uprCaseChk = /[A-Z]/.test(password)
    const spcChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const numChk = /[0-9]/.test(password)
    return lenChk && uprCaseChk && spcChar && numChk
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const pwdValid = validatePwd(formData.password)
    const pwdmatch = formData.password === formData.confirmPassword

    if (!pwdValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long, contain an uppercase letter, a special character, and a number."
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: ''
      }))
    }

    if (!pwdmatch) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: ''
      }))
    }

    if (pwdValid && pwdmatch) {
      try {
        const response = await server.post('/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        console.log(response.data)
        navigate('/login')
      } catch (err) {
        console.error(err)
        setError('Registration failed')
      }
    }
  }

  return (
    <>
      <Header />

      <div className="main-content">
        <div className="form-area">
          <form onSubmit={handleSubmit}>
            <div className="email-input">
              <input 
                type="email" 
                placeholder="Email"
                className="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="username-input">
              <input 
                type="text" 
                placeholder="Username"
                className="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password-input">
              <input 
                type="password" 
                placeholder="Password"
                className="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password-input">
              <input 
                type="password" 
                placeholder="Confirm Password"
                className="password"
                id="confirm-pwd"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="forgot-pwd">
              <Link to="/login" className="login-page">Already a User?</Link>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            {error && <p className="error">{error}</p>}
            <div className="signup-btn">
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
