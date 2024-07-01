import React, { useState } from "react"
import Header from "../Header/header"
import './signup.css'
import { Link, useNavigate } from "react-router-dom"
import server from "../../utils/axios"
import { toast } from 'react-toastify'

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const[loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const changeFavicon = (link) => {
    let $favicon = document.querySelector('link[rel="icon"]')

    if ($favicon !== null) {
        $favicon.href = link
    } else {
        $favicon = document.createElement("link")
        $favicon.rel = "icon"
        $favicon.href = link
        document.head.appendChild($favicon)
    }
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
    setLoading(true)
    changeFavicon('/assests/Eclipse@1x-0.8s-200px-200px.gif')

    const pwdValid = validatePwd(formData.password)
    const pwdmatch = formData.password === formData.confirmPassword

    if (!pwdValid) {
      setLoading(false)
      toast.error(
        `Password must be at least 8 characters long, 
        contain an uppercase letter, 
        a special character, and a number.`,
        {
          position: "top-center"
        }
      )
      return
    }

    if (!pwdmatch) {
      setLoading(false)
      toast.error("Passwords do not match." ,{
        position: "top-center"
      })
      return
    }

    if (pwdValid && pwdmatch) {
      try {
        const response = await server.server.post('/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        console.log(response.data)
        toast.success("Registration successful! Please log in.", {
          position: "top-center",
          onClose: () => {
            setLoading(false)
            changeFavicon('/favicon.ico')
            setTimeout(() => {
                navigate('/login')
            }, 750)
        }
        })
      } catch (err) {
        console.error(err)
        setLoading(false)
        toast.error("Registration failed. Please try again.", {
          position: "top-center"
        })
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
