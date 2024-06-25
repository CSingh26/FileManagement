import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/authContext'
import './header.css'

function Header() {

    const [isActive, setActive] = useState(false)
    const { auth, logout } = useContext(AuthContext)
    const navigate = useNavigate('')

    const hadnleHamMenu = () => {
        setActive(!isActive)
    }

    const handleNavMenu = () => {
        setActive(false)
    }

    const handleLogout= () => {
        logout()
        // navigate('/login')
    }
    return(
        <header>
            <nav className="navbar">
                <Link to={"/"} className="logo">File-Zen</Link>
                <ul className={`nav-menu ${isActive ? 'active' : ''}`} onClick={handleNavMenu}>
                    {auth ? (
                        <>
                            <li className="nav-items">
                                <Link to="/profile" className="nav-links">{auth.user.username}</Link>
                            </li>
                            <li className="nav-items">
                                <Link to="/dashboard" className="nav-links">Dashboard</Link>
                            </li>
                            <li className="nav-items">
                                <Link to="#" onClick={handleLogout} className="nav-links">Logout</Link> 
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-items">
                                <Link to="/login" className="nav-links">Login</Link>
                            </li>
                            <li className="nav-items">
                                <Link to="/signup" className="nav-links">Sign-Up</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={hadnleHamMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    )
}

export default Header