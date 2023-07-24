import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';

import * as React from 'react';
// const tableCellClasses = {
//   head: 'my-table-cell-head',
//   body: 'my-table-cell-body',
// };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function TableUI({headings, rows}) {
  return (
    <TableContainer component={Paper} style={{}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow>

          {headings.map((heading) => (
                  <StyledTableCell key={heading} align="center" style={{backgroundColor: "#0E3EDA"}}>{heading}</StyledTableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row[0]}
              </StyledTableCell>
              <StyledTableCell align="center">{row[1]}</StyledTableCell>
              <StyledTableCell align="center">{row[2]}</StyledTableCell>
              <StyledTableCell align="center">{row[3]}</StyledTableCell>
              <StyledTableCell align="center">{row[4]}</StyledTableCell>
              <StyledTableCell align="center">{row[5]}</StyledTableCell>
              <StyledTableCell align="center">{row[6]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}