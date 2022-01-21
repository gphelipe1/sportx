import React, { useState } from 'react';
import './index.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Table({ tableData, headingColumns, loading, page, rowsPerPage, handleChangeRowsPerPage, handlerPageChange}) {


  // const handler = (event, value) => {
  //   setThisPage(value);
  // };

  return (
    <><div className="tableDiv">
      {tableData.length === 0 ? <><iframe src="https://giphy.com/embed/W8I7CDnUvofPPFbCZN" width="303" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/alien-ufo-coinis-W8I7CDnUvofPPFbCZN"></a></p><h1 className="noData">No Data Available</h1></> : 
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
              <td classNamw="imp-col" data-label="CPF/CNPJ">{row.identity}</td>
             </tr>);
          }) : <></>}
        </tbody>
      </table>}
      <Stack className="mimicrow" spacing={2}  sx={{ bgcolor: (theme) => ('#fff'),
              p: 1,
              borderRadius: 0,
              textAlign: 'center',
          }} >
          <Pagination sx={{ml:'auto', mr: 'auto'}}variant="outlined" color="primary" count={10} showFirstButton showLastButton />
      </Stack>
    </div>
    </>

  );
}