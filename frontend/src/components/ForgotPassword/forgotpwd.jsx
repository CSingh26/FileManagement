import React, { useState } from "react"
import Header from "../Header/header"
import server from "../../utils/axios"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import './forgotpwd.css'

function ForgotPwd () {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleRequest = async (e) => {
        e.preventDefault()

        try {
            await server.post('/request-otp', { email })
            toast.success('OTP sent successfully', {
                position: 'top-center'
            })
            navigate('/reset-password', 
                { 
                    state: { email } 
                })
        } catch (err) {
            toast.error('Failed to send OTP', {
                position: 'top-center'
            })
        }
    }
    return (
        <>
         <Header />
         <div className="main-content">
            <div className="form-area">
                <form onSubmit={handleRequest}>
                    <div className="email-input">
                        <input 
                        type="email"
                        placeholder="Enter Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="user-email"
                        />
                    </div>
                    <div className="sub-btn">
                        <button type="submit">Request OTP</button>
                    </div>
                </form>
            </div>
         </div>
        </>
    )
}

export default ForgotPwd