import React, {useState, useEffect} from 'react';

import RankingBoard from './RankingBoard';
import EventsBoard from './EventsBoard';
import DisciplinesBoard from './DisciplinesBoard';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Select from 'react-select';
import "../Home.css";


const h2Style = {
    fontFamily:"Tahoma",
    color :"#000000",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "150px",
    marginLeft: "50px",
  };




function AdminBoard(props) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // fires only once at startup
    useEffect(() => {
        fetchBoard().then(response => {
            setOptions(response)
        });
    }, [])


    async function fetchBoard() {
        const response = await fetch('/disciplines/names');  // is a list of strings
        let res = await response.json();
        let newOptions = [];
        newOptions.push(res.map(data =>  ({value: data,label: data})));
        return newOptions;
    }

    // useEffect(() => {
    //     if (board){
    //         let newOptions = [];
    //         newOptions.push(board.map(data =>  ({value: data.Discipline,label: data.Discipline})));
    //         setOptions(newOptions);
    //     }
    // }, [board])

    useEffect(() => {
        console.log("options = ", options);
    },[options])

    useEffect(() => {
        console.log("selectedOption = ",selectedOption);
    }, [selectedOption])

   
        return (
                <div className="admin-dasbboard">
                    <div  className='admin-ranking-board'>
                        <div>
                            <RankingBoard />
                            {/* TODO: query per aggiungere una medaglia 
                                (aggiunta medaglia + aggiornamento numero medaglie + aggiornamento ordinamento in graduatoria)*/}
                            

                            

                            {/* TODO: query per eliminare una medaglia 
                                (aggiunta medaglia + aggiornamento numero medaglie + aggiornamento ordinamento in graduatoria)*/}
                        {/* { options && <Select isSearchable defaultValue={selectedOption} onChange={setSelectedOption} options={options[0]} />} */}
                        </div>

                        <div>
                            <EventsBoard />
                            {/* TODO: query per aggiornare un evento */}
                            {/* TODO: query per aggiungere un evento */}
                            {/* TODO: query per rimuovere un evento */}
                        </div>
                        <div>
                            <DisciplinesBoard />
                            {/* TODO: query per aggiornare una disciplina
                                (aggiungere atleta, rimuovere atleta, aggiornare un atleta) */}
                            {/* TODO: query per aggiungere una disciplina */}
                            {/* TODO: query per rimuovere una disciplina */}
                        </div>
                    </div>


{/*                     
                    <div className="admin-board">
                    <TableContainer component={Paper} style={{backgroundColor: '#01579b'}}>
                        <h2 style={h2Style}>Disciplines Board</h2>
                        {board && <DisciplinesSearchTab />} 
                        {options && <DisciplinesCollapsibleTable selectedOption={selectedOption}/>}
                    </TableContainer>
                    </div> */}
                </div>
        )
}

export default AdminBoard;