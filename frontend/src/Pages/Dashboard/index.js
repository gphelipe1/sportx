/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../Components/Sidebar';
import './index.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../Services/auth';
import { getClients, removeClient, getClientById, getClientsOnSearch } from '../../Services/clients';
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
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [pagesCount, setPagesCount] = useState(0);
    const [addClient, setAddClient] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [edittingClient, setEdittingClient] = useState(false);
    const [clientToEdit, setClientToEdit] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Alerts
    const [actionComplete, setActionComplete] = useState(false);
    const [actionWrong, setActionWrong] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    async function getData(dpage=page, dsize=rowsPerPage) {
        const dataLoaded = await getClients(dpage,dsize);
        const formatData = transformData(dataLoaded);
        setData(formatData.data);
        setPagesCount(formatData.pagesCount);
        setLoading(false);
    }

    async function getDataSearch(dpage=page, dsize=rowsPerPage) {
        const dataLoaded = await getClientsOnSearch(1,dsize, searchTerm);
        const formatData = transformData(dataLoaded);
        setData(formatData.data);
        setPagesCount(formatData.pagesCount);
        setLoading(false);
    }


    const editClicked = async (response) => {
        const client = await getClientById(response.row.id);
        if(client !== null) {
            setClientToEdit(client);
            setEdittingClient(true);
        }
    }


    const getResponseAndRefresh = (response) => {
        getData();
        if(response.has_error){
            setActionWrong(true);
        }else{
            setActionComplete(true);
        }
    }

    const removeClicked = async (response) => {
        const removed = await removeClient(response.row.id);
        if(removed.has_error){
            setDeleteError(true);
        }else{
            setClientDeleted(true);
        }
        getData(page, rowsPerPage);
    }

    const handleSearch = (e) => {
        setSearchTerm(e);
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
            "identity": client.type === 1 ? client.cpf !== null && client.cpf !== ""  ? client.cpf :  ' - - - - - -'  : client.cnpj !== null && client.cnpj !== "" ? client.cnpj : ' - - - - - -' ,
            "phones": client.phones !== null && client.phones !== ""  ? client.phones.replaceAll(';',` / `) : '- - - - - -'
          }));
    
        return {data: dataset, totalItems: fullResponse.totalItems, currentPage: fullResponse.currentPage, pagesCount: fullResponse.pagesCount};

    }

    // function addClientController (){
    //     let flag = addClient;
    //     setAddClient(!flag);
    // }

    useEffect(() => {
        if (!isAuthenticated()) {
            Navigate('/login');
            window.location.reload();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getData();
    }, [page]);

    useEffect(() => {
        if(refresh === true){
            getData();
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(()=>{
        if(searchTerm!== ""){
            getDataSearch();
        }else{
            getData();
        }
    }, [searchTerm])
    

    return(
        <>
            
            <Sidebar getData={() => getData()} onSearch={(e) => handleSearch(e)} />
            <div className="tableContainer">
                {loading === false ?  data.length === 0 ? <><img src={require('../../Assets/Images/no-data.gif')}  class="giphy-embed" ></img><p style={{color: "#fff"}}><h5 style={{marginLeft: '30%' }}>Nothing Found :(</h5></p></> 
                :  <Table tableData={data} headingColumns={tableColumns} loading={loading} page={page} pagesCount={pagesCount} handler={handleChangePage} editClient={editClicked} removeClient={removeClicked}/> : <></> }
            </div>
                {edittingClient === true  ? <AddNewClient className = "PopUp" 
                                                        controller={edittingClient}
                                                        setController={setEdittingClient}
                                                        title="Editar Cliente"
                                                        closeBtn={true}
                                                        clientToEdit={clientToEdit}
                                                        responseOnRefresh={getResponseAndRefresh}
                                                    /> : <></> }
            <div>
                {clientDeleted ? <Alert setOpen={() => setClientDeleted()} open={clientDeleted} severity="success" message="Cliente Deletado com sucesso!" /> : <></> }
                {deleteError ? <Alert setOpen={() => setDeleteError()} open={deleteError} severity="error" message="Algo deu errado ao deletar o cliente!" /> : <></> }
                {actionComplete ? <Alert setOpen={() => setActionComplete()} open={actionComplete} severity="success" message="Cliente editado com sucesso!" /> : <></> }
                {actionWrong ? <Alert setOpen={() => setActionWrong()} open={actionWrong} severity="error" message="Erro ao realizar a ação!" /> : <></> }
            </div>
           </>
    );
}

export default Dashboard;