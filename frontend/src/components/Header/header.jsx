import React, { useState } from "react";
import { Link } from "react-router-dom";
import './header.css'

function Header() {

    const [isActive, setActive] = useState(false)

    const hadnleHamMenu = () => {
        setActive(!isActive)
    }

    const handleNavMenu = () => {
        setActive(false)
    }
    return(
        <header>
            <nav className="navbar">
                <Link to={"/"} className="logo">File-Zen</Link>
                <ul className={`nav-menu ${isActive ? 'active' : ''}`} 
                onClick={handleNavMenu}>
                    <li className="nav-items">
                        <Link to={"/login"} className="nav-links">Login</Link>
                    </li>
                    <li className="nav-items">
                        <Link to={"/signup"} className="nav-links">Sign-Up</Link>
                    </li>
                </ul>
                <div className={`hamburger ${isActive ? 'active' : ''}`} 
                onClick={hadnleHamMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    )
}

export default Header