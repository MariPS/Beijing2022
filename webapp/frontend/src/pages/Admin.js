import React from 'react';
import AdminBoard from '../components/AdminBoard'
import '../Home.css';
import logo from "../logo-footer.png"

const Admin = () => {
    return (
        <div className="container">
            <div className="header">
                {/* <img className="header-logo" src={pic} alt="logo" /> */}
            </div>
            <div className="admin">
                <div className='admin-title' >
                    <h1>Admin Dasboard</h1>
                </div>
                <AdminBoard />
            </div>
            <footer>
                <img className='footer-logo' alt='footer-logo' src={logo}/>
                <div className='copyright'>2022 Winter Olympics  © Copyright 2022 </div>
            </footer>
            
        </div>
    )
}

export default Admin;