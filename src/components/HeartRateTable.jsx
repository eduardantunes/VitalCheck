import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(categoria, valorMinimo, valorMaximo) {
  return { categoria, valorMinimo, valorMaximo };
}

const rows = [
  createData('Frequência cardíada ideal', '55 bpm', '70 bpm'),
  createData('Frequencia cardíaca normal', '60 bpm', '100 bpm'),
  createData('Frequência cardíaca rápida', '100 bpm', '160 bpm'),
  createData('Frequência cardíaca ruim', '45 bpm', '60 bpm'),
];
function secondTable(temperatura, tempMin, tempMax){
  return{temperatura, tempMin, tempMax}
}
const secondRows = [
  secondTable('Ideal', '36º', '37.2º'),
  secondTable('Febril', '37.3º', '37.7º'),
  secondTable('Febre', '37.8º', '-'),
]
const useStyles = makeStyles({
  table: {
    minWidth: 700,   
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Categoria</StyledTableCell>
            <StyledTableCell align="center">Valor mínimo (BPM)</StyledTableCell>
            <StyledTableCell align="center">Valor máximo (BPM)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.categoria}
              </StyledTableCell>
              <StyledTableCell align="center">{row.valorMinimo}</StyledTableCell>
              <StyledTableCell align="center">{row.valorMaximo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      <br />
      <br />

      </Table>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Temperatura</StyledTableCell>
            <StyledTableCell align="center">Mínima (Cº)</StyledTableCell>
            <StyledTableCell align="center">Máxima (Cº)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secondRows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.temperatura}
              </StyledTableCell>
              <StyledTableCell align="center">{row.tempMin}</StyledTableCell>
              <StyledTableCell align="center">{row.tempMax}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <p>
          <br />
          *BPM = Batímentos por minuto
        </p>
      </div>

    </TableContainer>
  );
}
