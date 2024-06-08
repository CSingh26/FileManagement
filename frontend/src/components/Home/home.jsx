import React from "react";
import Header from "../Header/header";

function Home() {
    return(
        <>
            <Header />
            <div className="main-content">
                <p>Welcome to File Zen</p>
                <p>Begin your file management journey here</p>
            </div>
        </>
        
    )
}

export default Home