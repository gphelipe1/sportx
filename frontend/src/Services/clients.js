import api from './api';
import { logout } from './auth';

export async function getClients(page, size,) {
  try {
    const response = await api.get(`v1/clientes?page=${page}&size=${size}`);
    const allData = response.data.items;
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
        "cep": client.cep === "" ? ' - - - - - -': client.cep,
        "identity": client.type===1 ? client.cpf === null ? ' - - - - - -' : client.cpf : client.cnpj === null ? ' - - - - - -' : client.cnpj,
        "phones": client.phones !== "" ? client.phones.replaceAll(';',`/ 
        `) : '- - - - - -'
      }));

    return {data: dataset, totalItems: response.data.totalItems, currentPage: response.data.currentPage, pagesCount: response.data.pagesCount};

  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        logout();
      }
    }
    return {
      has_error: true,
      err
    };
  }
}

export async function saveNewClient(nome, email, tipo, classificacao, cep, identity='', phones=[]) {
  
  // Pass identity to a variable, checking if it will recieve NULL or a real value
  let identityValue = identity !== '' ? identity : null;
  try {
     const newClient = {
      "nome": nome,
      "email": email,
      "Type": tipo,
      "Classificacao": classificacao,
      "CEP": cep,
      "CPF": tipo === 1 ? identityValue : null,
      "CNPJ": tipo === 0 ? identityValue : null,
      "Telefones": phones
    }

    const response = await api.post('v1/clientes', newClient);
    return response.status;

  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        logout();
      }
    }
    return {
      has_error: true,
      err
    };
  }
}