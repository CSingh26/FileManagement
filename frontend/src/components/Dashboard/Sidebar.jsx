import React, { useState, useContext } from "react"
import  { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './sidebar.css'

function Sidebar() {
    const[showProfile, setShowProfile] = useState(false)
    const { logout } = useContext(AuthContext)

    const handleLogout= () => {
        logout()
    }

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="#">Tasks</Link>
            </div>
            <div
                className={`sidebar-profile ${setShowProfile ? 'active' : ''}`}
                onClick={() => setShowProfile(!showProfile)}
            >
                <div className="profile-info">
                    <img src="/assests/76dced65cd1a37d0fb63aa298e9305b8.JPG" 
                    alt="profile-pic"></img>
                    <span>Username</span>
                </div>
                {showProfile && (
                    <div className="profile-options">
                        <Link to="/profile">Profile</Link>
                        <Link to="#" onClick={handleLogout}>Logout</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar