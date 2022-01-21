/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../Components/Sidebar';
import './index.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../Services/auth';
import { getClients } from '../../Services/clients';
import Table from '../../Components/Table'
import Pagination from '../../Components/Pagination';

function Dashboard()
{   
    const tableColumns=['ID', 'Nome/Razão Social', 'Email', 'Tipo', 'Classificação', 'CEP', 'CPF/CNPJ'];

    const navigateTo = useNavigate();
    const [loading, setLoading] =  useState(true);
    const [refresh, setRefresh] =  useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(1);
        console.log(event.target.value,10);
      };
    function setDataTable(dataTable){
        setData(dataTable);
        console.log(dataTable);
    }

    async function getData(dpage, dsize) {
        const dataLoaded = await getClients(page,rowsPerPage);
        setDataTable(dataLoaded);
        setLoading(false);
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            Navigate('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getData(page,rowsPerPage);
    }, [page]);

    return(
        <>
            <Sidebar />
            <div className="tableContainer">
                <Table tableData={data} headingColumns={tableColumns} loading={loading} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage}  onRowsPerPageChange={handleChangeRowsPerPage}/>
            </div>
           </>
    );
}

export default Dashboard;