import React, {useState, useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import "../Home.css";
import EventsTable from './EventsTable';

const h2Style = {
    fontFamily:"Tahoma",
    fontSize: "1.3em",
    color :"#ffffff",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "150px",
    marginLeft: "50px",
  }


function EventsBoard(props) {
    const [eventsBoard, setEventsBoard] = useState(null);

    // fires only once at startup
    useEffect(() => {
        fetchEventsBoard().then(response => {
            console.log("EventsBoardData = ", response);
            setEventsBoard(response);
        })
    }, [])

    async function fetchEventsBoard() {
        const response = await fetch('/events');  // is a list of dicts
        let data = await response.json();
        return data;
    }


    

    return (
            <div className='events-board'>
                <TableContainer component={Paper} style={{backgroundColor: '#ffca28', height: 500}}>
                    <h2 style={h2Style}>Events Board</h2>
                    {eventsBoard && <EventsTable rows={eventsBoard}/>}
                </TableContainer>
                
            </div>
        )
}

export default EventsBoard;