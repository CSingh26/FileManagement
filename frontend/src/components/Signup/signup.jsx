import React, { useState } from "react";
import Header from "../Header/header";
import './signup.css'
import { Link } from "react-router-dom";

function SignupForm() {
    const [formData,setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value})
    }

    const validatePwd = (password) => {
        const lenChk = password.length >= 8
        const uprCaseChk = /[A-Z]/.test(password)
        const spcChar = /[!@#$%^&*(),.?{}|]/.test(password)
        const numChk = /[0-9]/.test(password)
        return lenChk && uprCaseChk && spcChar && numChk
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <>
            <Header />

            <div className="main-content">
                <div className="form-area">
                    <form action="">
                        <div className="email-input">
                            <input 
                            type="email" 
                            placeholder="Email"
                            className="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            />
                        </div>
                        <div className="forgot-pwd">
                            <Link to={"/login"} className="login-page">Already a User?</Link>
                        </div>
                        <div className="signup-btn">
                            <button>Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupForm