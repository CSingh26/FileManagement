import React, { useState}from "react";
import Header from "../Header/header";
import { Link } from "react-router-dom";
import './login.css'

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target 
        setFormData({ ...formData, [name]: value})
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
                    <form method="post">
                        <div className="username-input">
                            <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="username"
                            />
                        </div>
                        <div className="password-input">
                            <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="password"
                            />
                        </div>
                        <div className="forgot-pwd">
                            <Link to={"/login"} className="for-pwd">Forgot Password?</Link>
                        </div>
                        <div className="signup-page">
                            <p>Don't have an Account? <Link to={"/signup"} className="for-pwd">Register</Link></p>
                        </div>
                        <div className="login-btn">
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm