import React, { useContext, useState, useEffect }from "react"
import Header from "../Header/header"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/axios"
import './login.css'
import { AuthContext } from "../../context/authContext"

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setErrors] = useState('')
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

            const { token, user } = response.data;
            login(token, user)
            history('/profile')
        } catch (err) {
            setErrors('Invalid Credentials')
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
                            <Link to={"/login"} className="for-pwd">Forgot Password?</Link>
                        </div>
                        <div className="signup-page">
                            <p>Don't have an Account? <Link to={"/signup"} className="for-pwd">Register</Link></p>
                        </div>
                        {error && <p className="error">{error}</p>}
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