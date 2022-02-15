import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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


function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell />
        <StyledTableCell component="th" scope="row" align="left">{row.location}</StyledTableCell>
        <StyledTableCell align="center">{row.event_stage}</StyledTableCell>
        <StyledTableCell align="center">{row.event_status}</StyledTableCell>
          <StyledTableCell align="center">{row.time}</StyledTableCell>
          <StyledTableCell align="center">{row.discipline}</StyledTableCell>
      </StyledTableRow>

    </React.Fragment>
  );
}





export default function EventsTable(props) {

  return (
    <div>
    <TableContainer style={{maxHeight: '500px', overflow: "scroll"}} component={Paper}>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <StyledTableRow >
            <StyledTableCell />
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Event stage</StyledTableCell>
            <StyledTableCell>Event status</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Discipline</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}