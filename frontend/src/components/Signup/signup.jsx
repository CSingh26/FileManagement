import React from "react";
import Header from "../Header/header";
import './signup.css'
import { Link } from "react-router-dom";

function SignupForm() {
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
                            />
                        </div>
                        <div className="username-input">
                            <input 
                            type="text" 
                            placeholder="Username"
                            className="username"
                            />
                        </div>
                        <div className="password-input">
                            <input 
                            type="password" 
                            placeholder="Password"
                            className="password"
                            />
                        </div>
                        <div className="password-input">
                            <input 
                            type="password" 
                            placeholder="Confirm Password"
                            className="password"
                            id="confirm-pwd"
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