/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../Components/Sidebar';
import './index.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../Services/auth';
import { getClients, removeClient } from '../../Services/clients';
import Alert from '../../Components/Snackbar';
import Table from '../../Components/Table';
import AddNewClient from '../../Components/AddNewClient';

function Dashboard()
{   
    const tableColumns=['ID', 'Nome/Razão Social', 'Email', 'Tipo', 'Classificação', 'CEP', 'CPF/CNPJ', 'Telefone', 'Editar', 'Remover'];

    const navigateTo = useNavigate();
    const [loading, setLoading] =  useState(true);
    const [refresh, setRefresh] =  useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [pagesCount, setPagesCount] = useState(0);
    const [addClient, setAddClient] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // function setDataTable(dataTable){
    //     setData(dataTable);
    //     console.log(dataTable);
    // }

    async function getData(dpage=page, dsize=rowsPerPage) {
        const dataLoaded = await getClients(dpage,dsize);
        const formatData = transformData(dataLoaded);
        setData(formatData.data);
        setPagesCount(formatData.pagesCount);
        setLoading(false);
    }

    const editClicked = (response) => {
        console.log(response.row);
    }
    const removeClicked = async (response) => {
        const removed = await removeClient(response.row.id);
        console.log(removed);
        if(removed.has_error){
            setDeleteError(true);
        }else{
            setClientDeleted(true);
        }
        getData(page, rowsPerPage);
    }

    function transformData(fullResponse){
        const allData = fullResponse.items;
        const classificador = {0: 'Ativo', 1:'Inativo', 2: 'Preferencial' }
        const clientType = { 0: 'Pessoa Jurídica', 1: 'Pessoa Física' }
        const dataset = [];
    
        allData.map(
          client => 
          dataset.push({
            "id": client.id,
            "nome": client.nome,
            "email": client.email,
            "tipo": clientType[client.type],
            "classificacao": classificador[client.classificacao],
            "cep": client.cep !== null && client.cep !== ""  ? client.cep : ' - - - - - -',
            "identity": client.type === 1 ? client.cpf !== null && client.phones !== "" ? client.cpf :  ' - - - - - -'  : client.cnpj === null ? ' - - - - - -' : client.cnpj,
            "phones": client.phones !== null && client.phones !== ""  ? client.phones.replaceAll(';',`/ 
            `) : '- - - - - -'
          }));
    
        return {data: dataset, totalItems: fullResponse.totalItems, currentPage: fullResponse.currentPage, pagesCount: fullResponse.pagesCount};

    }

    function addClientController (){
        let flag = addClient;
        setAddClient(!flag);
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            Navigate('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getData();
        console.log("PAGE");
        console.log(page);
    }, [page]);


    useEffect(() => {
        console.log(addClient);
    }, [addClient]);
    

    return(
        <>
            
            <Sidebar />
            <div className="tableContainer">
                {loading === false ? <Table tableData={data} headingColumns={tableColumns} loading={loading} page={page} pagesCount={pagesCount} handler={handleChangePage} editClient={editClicked} removeClient={removeClicked}/> : <></> }
            </div>
            <div>
            {clientDeleted ? <Alert setOpen={() => setClientDeleted()} open={clientDeleted} severity="success" message="Cliente Deletado com sucesso" /> : <></> }
            {deleteError ? <Alert setOpen={() => setDeleteError()} open={deleteError} severity="error" message="Algo deu errado ao deletar o cliente" /> : <></> }
            </div>
           </>
    );
}

export default Dashboard;