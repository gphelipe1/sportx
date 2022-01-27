import api from './api';
import { logout } from './auth';

export async function getClients(page, size,) {
  try {
    const response = await api.get(`v1/clientes?page=${page}&size=${size}`);
    const allData = response.data;

    return allData;

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

export async function removeClient(clientId) {
  try {
    const response = await api.delete(`v1/clientes/delete/?id=${clientId}`);
    const data = response.data;

    return data;

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