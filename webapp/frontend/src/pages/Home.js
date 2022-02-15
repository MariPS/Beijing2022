import React from 'react';
import MedalsBoard from '../components/MedalsBoard';
import '../Home.css';
import pic from "../image.jpeg"
import EventsBoard from '../components/EventsBoard';
import DisciplinesBoard from '../components/DisciplinesBoard';


const Home = () => {
    return (


        <div className="container">
            <div className="header"><img className="header-logo" src={pic} alt="logo" /></div>
            <div className="dashboards">
                <MedalsBoard />
                <EventsBoard />
            </div>
            <DisciplinesBoard />
            
        </div>
    )
}

export default Home;