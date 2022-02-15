import React from 'react';
import AdminBoard from '../components/AdminBoard'
import '../Home.css';
import pic from "../image.jpeg"


const Admin = () => {
    return (
        <div className="container">
            <div className="header">
                <img className="header-logo" src={pic} alt="logo" />
            </div>
            <div className="admin">
                <h1>Admin Dasboard</h1>
                <AdminBoard />
            </div>
            
            
        </div>
    )
}

export default Admin;