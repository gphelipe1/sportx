import api from './api';
import { logout } from './auth';

export async function getClients(page, size,) {
  try {
    const response = await api.get(`v1/clientes?page=${page}&size=${size}`);
    const allData = response.data;
    const classificador = {0: 'Ativo', 1:'Inativo', 2: 'Preferencial' }
    const clientType = { 0: 'Pessoa Jurídica', 1: 'Pessoa Física' }
    const returnData = [];

    allData.map(
      client => 
      returnData.push({
        "id": client.id,
        "nome": client.nome,
        "email": client.email,
        "tipo": clientType[client.type],
        "classificacao": classificador[client.classificacao],
        "cep": client.cep ===null ? ' - - - - - -': client.cep,
        "identity":client.type===1 ? client.cpf : client.cnpj,
      }));

    return returnData;

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