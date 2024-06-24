import React, { useState } from "react"
import Header from "../Header/header"
import server from "../../utils/axios"
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from "react-router-dom"
import './forgotpwd.css'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: location.state?.email || '',
        otp: '',
        newPassword: '',
        confirmNewPassword: ''
      })

    const validatePwd = (password) => {
        const lenChk = password.length >= 8
        const uprCaseChk = /[A-Z]/.test(password)
        const spcChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const numChk = /[0-9]/.test(password)
        return lenChk && uprCaseChk && spcChar && numChk
      }

      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const pwdValid = validatePwd(newPassword)
        const pwdMatch = formData.newPassword === formData.confirmNewPassword

        if (!pwdValid) {
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

          if (!pwdMatch) {
            toast.error("Passwords do not match." ,{
              position: "top-center"
            })
            return
          }

          if (pwdMatch && pwdMatch) {
            try {
                await server.post('/verify-otp', {
                    email: formData.email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                })
                toast.success('Password reset successfully')
            } catch (err) {
                toast.error('Failed to reset password')
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
                        placeholder="Enter Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="user-email"
                        required
                        />
                    </div>
                    <div className="otp-input">
                        <input 
                        type="text"
                        placeholder="Enter Verification OTP"
                        name="OTP"
                        value={formData.otp}
                        onChange={handleChange}
                        className="user-otp"
                        />
                    </div>
                    <div className="password-input">
                        <input 
                        type="password"
                        placeholder="Enter the New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="user-password"
                        />
                    </div>
                    <div className="password-input">
                        <input 
                        type="password"
                        placeholder="Confirm the new Password"
                        name="confirmPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="user-password"
                        />
                    </div>
                    <div className="sub-btn">
                        <button type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
         </div>
        </>
    )
}

export default ResetPassword