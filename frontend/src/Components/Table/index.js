import React from 'react';
import './index.css';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
export default function Table({ tableData, headingColumns, loading, page, pagesCount, handler, editClient, removeClient}) {

  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));
  const classes = useStyles();

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <>
      <table>
        <thead>
        <tr>
           {headingColumns.map(element => {
            return (<th scope="col">{element}</th>)
          })}
        </tr>
        </thead>
        <tbody>
        {loading===false ? tableData.map(row => {
            return(<tr key={row.id} className="hover">
              <td data-label="Id">{row.id}</td>
              <td data-label="Nome">{row.nome}</td>
              <td data-label="Email">{row.email}</td>
              <td data-label="Tipo">{row.tipo}</td>
              <td data-label="Classificação">{row.classificacao}</td>
              <td data-label="CEPl">{row.cep}</td>
              <td data-label="CPF/CNPJ">{row.identity}</td>
              <td data-label="Telefones">{row.phones}</td>
              <td data-label="Editar"><Button onClick={() => editClient({row}) }><EditIcon sx={{ color: '#42ba96' }} /></Button></td>
              <td data-label="Remover"><Button onClick={() =>removeClient({row}) }><PersonRemoveAlt1Icon sx={{ color: '#df4759' }} /></Button></td>
             </tr>);
          }) : <></>}
        </tbody>
      </table></>
      { tableData.length > 0 ?
      <Stack className="mimicrow" spacing={2}  sx={{ bgcolor: (theme) => ('#252525'),color: (theme) => ('#fff'),
              p: 1,
              borderRadius: 0,
              textAlign: 'center',
          }} >
          <Pagination  sx={{ml:'auto', mr: 'auto'}} classes={{ ul: classes.ul }} variant="outlined" color="primary" count={pagesCount} showFirstButton showLastButton onChange={handler} />
      </Stack> : <></> }
    </div>

  );
}