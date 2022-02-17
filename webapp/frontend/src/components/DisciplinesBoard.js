import React, {useState, useEffect} from 'react';
import DisciplinesCollapsibleTable from './DisciplinesCollapsibleTable';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Select from 'react-select';
import "../Home.css";

const h2Style = {
    fontFamily:"Tahoma",
    fontSize: "1.3em",
    color :"#ffffff",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "150px",
    marginLeft: "50px",
  };

const optionStyle = {
    fontFamily:"Tahoma",
    fontSize: "1em",
    color :"#ffffff",
    margin: "auto",
    marginRight:"100px"
}




function DisciplinesBoard(props) {
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
                <div className="disciplines-dashboard">
                    <div  className='disciplines-search-options' style={{maxHeight: 200}}>
                        <h2 style={optionStyle}>Select discipline</h2>
                        <div> 
                        { options && <Select isSearchable defaultValue={selectedOption} onChange={setSelectedOption} options={options[0]} />}
                        </div>
                        
                    </div>
                    <div className="disciplines-board">
                    <TableContainer component={Paper} style={{backgroundColor: '#01579b', maxHeight: 500}}>
                        <h2 style={h2Style}>Disciplines Board</h2>
                        {/* {board && <DisciplinesSearchTab />} */}
                        {options && <DisciplinesCollapsibleTable selectedOption={selectedOption}/>}
                    </TableContainer>
                    </div>
                </div>
        )
}

export default DisciplinesBoard;