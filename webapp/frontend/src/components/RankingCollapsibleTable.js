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
    backgroundColor: '#ffca28',
    color: theme.palette.common.white,
    fontSize: 12,
    fontFamily: "Tahoma",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledInnerTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffca28',
    color: theme.palette.common.white,
    fontSize: 14,
    fontFamily: "Tahoma",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
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
  const [open_gold, setOpenGold] = React.useState(false);
  const [open_silver, setOpenSilver] = React.useState(false);
  const [open_bronze, setOpenBronze] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell />
        <StyledTableCell component="th" scope="row" align="left">{row.Order}</StyledTableCell>
        <StyledTableCell align="center">{row.Country}</StyledTableCell>
        <StyledTableCell align="center">{row.Gold}<IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              open_silver && setOpenSilver(!open_silver);
              open_bronze && setOpenBronze(!open_bronze);
              setOpenGold(!open_gold);}}
          >
            {open_gold ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton></StyledTableCell>
        <StyledTableCell align="center">{row.Silver}<IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              open_gold && setOpenGold(!open_gold);
              open_bronze && setOpenBronze(!open_bronze);
              setOpenSilver(!open_silver);}}
          >
            {open_silver ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton></StyledTableCell>
          <StyledTableCell align="center">{row.Bronze}<IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              open_silver && setOpenSilver(!open_silver);
              open_gold && setOpenGold(!open_gold);
              setOpenBronze(!open_bronze);}}
          >
            {open_gold ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton></StyledTableCell>
          <StyledTableCell align="center">{row.Total}</StyledTableCell>
          <StyledTableCell align="center">{row["Order by Total"]}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open_gold} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <TableContainer component={Paper} >
              <Table size="small">
                <TableHead>
                  <StyledInnerTableRow>
                    <StyledInnerTableCell>Medal date</StyledInnerTableCell>
                    <StyledInnerTableCell>Athlete name</StyledInnerTableCell>
                    <StyledInnerTableCell>Discipline</StyledInnerTableCell>
                    <StyledInnerTableCell>Event</StyledInnerTableCell>
                  </StyledInnerTableRow>
                </TableHead>
                <TableBody>
                {row.gold_medals && row.gold_medals.map((medal) => (
               
                    <StyledInnerTableRow key={[medal.medal_date,medal.athlete_name]}>
                    <StyledInnerTableCell component="th" scope="row">
                      {medal.medal_date}
                    </StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.athlete_name}</StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.discipline}</StyledInnerTableCell>
                    <StyledInnerTableCell align="right">{medal.event}</StyledInnerTableCell>
                    
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
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open_silver} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <TableContainer component={Paper} >
              <Table size="small">
                <TableHead>
                  <StyledInnerTableRow>
                    <StyledInnerTableCell>Medal date</StyledInnerTableCell>
                    <StyledInnerTableCell>Athlete name</StyledInnerTableCell>
                    <StyledInnerTableCell>Discipline</StyledInnerTableCell>
                    <StyledInnerTableCell>Event</StyledInnerTableCell>
                  </StyledInnerTableRow>
                </TableHead>
                <TableBody>
                {row.silver_medals && row.silver_medals.map((medal) => (
               
                    <StyledInnerTableRow key={[medal.medal_date,medal.athlete_name]}>
                    <StyledInnerTableCell component="th" scope="row">
                      {medal.medal_date}
                    </StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.athlete_name}</StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.discipline}</StyledInnerTableCell>
                    <StyledInnerTableCell align="right">{medal.event}</StyledInnerTableCell>
                  </StyledInnerTableRow>
                ))}
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open_bronze} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <TableContainer component={Paper} >
              <Table size="small">
                <TableHead>
                  <StyledInnerTableRow>
                    <StyledInnerTableCell>Medal date</StyledInnerTableCell>
                    <StyledInnerTableCell>Athlete name</StyledInnerTableCell>
                    <StyledInnerTableCell>Discipline</StyledInnerTableCell>
                    <StyledInnerTableCell>Event</StyledInnerTableCell>
                  </StyledInnerTableRow>
                </TableHead>
                <TableBody>
                {row.bronze_medals && row.bronze_medals.map((medal) => (
               
                    <StyledInnerTableRow key={[medal.medal_date,medal.athlete_name]}>
                    <StyledInnerTableCell component="th" scope="row">
                      {medal.medal_date}
                    </StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.athlete_name}</StyledInnerTableCell>
                    <StyledInnerTableCell>{medal.discipline}</StyledInnerTableCell>
                    <StyledInnerTableCell align="right">{medal.event}</StyledInnerTableCell>
                  </StyledInnerTableRow>
                ))}
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>


    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    
    Order: PropTypes.number.isRequired,
    Country: PropTypes.string.isRequired,
    Gold:PropTypes.number.isRequired,
    Silver:PropTypes.number.isRequired,
    Bronze:PropTypes.number.isRequired,
    Total:PropTypes.number.isRequired,
//     gold_medals: PropTypes.arrayOf(
//       PropTypes.shape({
//         medal_date: PropTypes.string.isRequired,
//         athlete_name: PropTypes.string.isRequired,
//         discipline: PropTypes.string.isRequired,
//         event: PropTypes.string.isRequired,
//   }),),
//   silver_medals: PropTypes.arrayOf(
//     PropTypes.shape({
//       medal_date: PropTypes.string.isRequired,
//       athlete_name: PropTypes.string.isRequired,
//       discipline: PropTypes.string.isRequired,
//       event: PropTypes.string.isRequired,
// }))
    
  }).isRequired,
};



export default function RankingCollapsibleTable(props) {

  return (
    <div>
    <TableContainer style={{maxHeight: '500px', overflow: "scroll"}} component={Paper}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <StyledTableRow >
            <StyledTableCell />
            <StyledTableCell>Order</StyledTableCell>
            <StyledTableCell align='center'>Country</StyledTableCell>
            <StyledTableCell>Gold</StyledTableCell>
            <StyledTableCell>Silver</StyledTableCell>
            <StyledTableCell>Bronze</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Order by total</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <Row key={row.Country} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}