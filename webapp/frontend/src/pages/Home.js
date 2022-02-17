import React from 'react';
import RankingBoard from '../components/RankingBoard';
import '../Home.css';
import logo from "../logo-footer.png"
import EventsBoard from '../components/EventsBoard';
import DisciplinesBoard from '../components/DisciplinesBoard';


const Home = () => {
    return (


        <div className="container">
            <div className="header"></div>
            <div className="dashboards">
                <RankingBoard />
                <EventsBoard />
            </div>
            <DisciplinesBoard />
            <footer>
                <img className='footer-logo' alt='footer-logo' src={logo}/>
                <div className='copyright'>2022 Winter Olympics  © Copyright 2022 </div>
            </footer> 
        </div>
    )
}

export default Home;