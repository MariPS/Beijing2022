import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons//KeyboardArrowUp';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4f83cc',
    color: theme.palette.common.white,
    fontSize: 12,
    fontFamily: "Tahoma",
    maxWidth: '5rem',
    minWidth: '3rem'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    maxWidth: '5rem',
    minWidth: '3rem'
  },
}));

const StyledInnerTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4f83cc',
    color: theme.palette.common.white,
    fontSize: 14,
    fontFamily: "Tahoma",
    maxWidth: '1em',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    maxWidth: '1em',
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.selected,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledInnerTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // '&:nth-of-type(even)': {
  //   backgroundColor: theme.palette.action.selected,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row" align="left">{row.Discipline}</StyledTableCell>
        <StyledTableCell align="center">{row.Total}
        { row.Discipline !== "Total" && 
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
          </StyledTableCell>
        <StyledTableCell align="center">{row.M}</StyledTableCell>
        <StyledTableCell align="center">{row.F}</StyledTableCell>
      </StyledTableRow>
      { row.Discipline !== "Total" && 
      <StyledInnerTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <TableContainer component={Paper} >
              <Table size="small">
                <TableHead>
                  <StyledInnerTableRow>
                    <StyledInnerTableCell>Name</StyledInnerTableCell>
                    <StyledInnerTableCell>Country</StyledInnerTableCell>
                    <StyledInnerTableCell>Gender</StyledInnerTableCell>
                    <StyledInnerTableCell>Birthdate</StyledInnerTableCell>
                    <StyledInnerTableCell >Search more about...</StyledInnerTableCell>
                  </StyledInnerTableRow>
                </TableHead>
                <TableBody>
                  {row.athletes.map((athleteRow) => (
                    <StyledInnerTableRow key={athleteRow.name}>
                      <StyledInnerTableCell component="th" scope="row">
                        {athleteRow.name}
                      </StyledInnerTableCell>
                      <StyledInnerTableCell>{athleteRow.country_code}</StyledInnerTableCell>
                      <StyledInnerTableCell>{athleteRow.gender}</StyledInnerTableCell>
                      <StyledInnerTableCell align="right">{athleteRow.birth_date}</StyledInnerTableCell>
                      <StyledInnerTableCell align="right">{athleteRow.url}</StyledInnerTableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </StyledInnerTableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledInnerTableRow>
      }
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    
    Discipline: PropTypes.string.isRequired,
    Total: PropTypes.number.isRequired,
    M: PropTypes.number.isRequired,
    F: PropTypes.number.isRequired,
    athletes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        country_code: PropTypes.string.isRequired,
        birth_date: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};



export default function DisciplinesCollapsibleTable(props) {

  const [data,setData] = React.useState()

  // fires only once at startup
  React.useEffect(() => {
    async function fetchBoard() {
      const response = await fetch(`/disciplines/${props.selectedOption.value}`);  // is a list of dicts
      let data = await response.json();
      return data;
  }

    if (props.selectedOption != null) { 
        fetchBoard().then(response => {
            setData(response)
        });
    } else {
      setData(null);
    }
  },[props.selectedOption])





  return (
    <div>
    <TableContainer style={{height: "max-content"}} component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Discipline</StyledTableCell>
            <StyledTableCell>Total Athletes</StyledTableCell>
            <StyledTableCell>Total Athletes&nbsp;(M)</StyledTableCell>
            <StyledTableCell>Total Athletes&nbsp;(F)</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data && 
            <Row key={data.Discipline} row={data} />
 }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}