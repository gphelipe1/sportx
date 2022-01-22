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
        "cep": client.cep ===null ? ' - - - - - -': client.cep,
        "identity":client.type===1 ? client.cpf : client.cnpj,
        "phones": client.phones != null ? client.phones.replace(";",` 
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