import React, { useContext, useState, useEffect }from "react"
import Header from "../Header/header"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/axios"
import './login.css'
import { AuthContext } from "../../context/authContext"
import { toast } from 'react-toastify'

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const history = useNavigate()
    const { auth, login } = useContext(AuthContext)

    const handleChange = (e) => {
        const {name, value} = e.target 
        setFormData({ ...formData, [name]: value})
    }

    useEffect(() => {
        if (auth) {
            history('/profile')
        }
    }, [auth, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await api.post('/login', formData)
            console.log(response.data)

            const { user } = response.data;
            login(user)
            toast.success('Login Successful!', {
                position: "top-center"
            })
            history('/profile')
        } catch (err) {
            toast.error('Invalid Credentials', {
                position: "top-center"
            })
        }
    }
    return (
        <>
            <Header />

            <div className="main-content">
                <div className="form-area">
                    <form onSubmit={handleSubmit}>
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
                            <Link to={"/forgot-password"} className="for-pwd">Forgot Password?</Link>
                        </div>
                        <div className="signup-page">
                            <p>Don't have an Account? <Link to={"/signup"} className="for-pwd">Register</Link></p>
                        </div>
                        <div className="login-btn">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm