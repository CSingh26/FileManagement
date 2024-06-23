import React from "react"
import Header from "../Header/header"
import server from "../../utils/axios"
import { toast } from 'react-toastify'

function ForgotPwd () {
    return (
        <>
         <Header />
         <div className="main-content">
            <div className="form-area">
                <form action="">
                    <div className="email-input">
                        <input 
                        type="email"
                        placeholder="Enter Email Address"
                        name="email"
                        className="user-email"
                        />
                    </div>
                    <div className="sub-btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
         </div>
        </>
    )
}

export default ForgotPwd