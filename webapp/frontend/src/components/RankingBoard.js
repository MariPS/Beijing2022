import React, {useState, useEffect} from 'react';
import RankingCollapsibleTable from './RankingCollapsibleTable';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import "../Home.css";

const h2Style = {
    fontFamily:"Tahoma",
    fontSize: 18,
    color :"#ffffff",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "150px",
    marginLeft: "50px",
  };




function RankingBoard(props) {
    const [rankingBoard, setRankingBoard] = useState(null);

    // fires only once at startup
    useEffect(() => {
        fetchRankingBoard().then(response => {
            console.log("RankingBoardData = ", response);
            setRankingBoard(response);
        });
    }, [])

    async function fetchRankingBoard() {
        const response = await fetch('/rankings');  // is a list of dicts
        let data = await response.json();
        return data;
    }


    return (
            <div className='ranking-board'>
                <TableContainer component={Paper} style={{backgroundColor: '#c79a00'}}>
                    <h2 style={h2Style}>Ranking Board</h2>
                    {rankingBoard && <RankingCollapsibleTable rows={rankingBoard}/>}
                </TableContainer>
            </div>
        )
}

export default RankingBoard;