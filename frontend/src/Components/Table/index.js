import React from 'react';
import './index.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Table({ tableData, headingColumns, loading, page, pagesCount, handler}) {


  return (
    <div className="tableDiv">
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      {tableData.length === 0 ? <><img src={require('../../Assets/Images/no-data.gif')}  class="giphy-embed" ></img><p style={{color: "#fff"}}><h5 style={{marginLeft: '30%' }}>Sem clientes Cadastrados :(</h5></p></> : 
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
             </tr>);
          }) : <></>}
        </tbody>
      </table></>}
      { tableData.length > 0 ?
      <Stack className="mimicrow" spacing={2}  sx={{ bgcolor: (theme) => ('#fff'),
              p: 1,
              borderRadius: 0,
              textAlign: 'center',
          }} >
          <Pagination sx={{ml:'auto', mr: 'auto'}}variant="outlined" color="primary" count={pagesCount} showFirstButton showLastButton onChange={handler} />
      </Stack> : <></> }
    </div>

  );
}