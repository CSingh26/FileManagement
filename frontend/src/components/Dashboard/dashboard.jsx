import React from "react"
import Sidebar from "./Sidebar"
import './dashboard.css'

function userDashboard() {
   return (
    <>
        <div className="dashboard-main">
            <Sidebar />
            <div className="dasbaord-content">
                
            </div>
        </div>
    </>
   )
}

export default userDashboard