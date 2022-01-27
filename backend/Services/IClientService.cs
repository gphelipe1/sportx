using System;
using System.Collections.Generic;
using webnet.DAO;
using webnet.DTO;
using webnet.Enums;
using Canducci.Pagination;

namespace webnet.Services
{
    public interface IClientService
    {
        ClienteDto Save(ClienteDto dto);
        ClienteDto Update(ClienteDto dto);
        ResponseClienteDto GetAllClients(int page, int size);
        List<ClienteDto> GetByType(UserType type);
        ClienteDto GetByCPF(string cpf);
        ClienteDto GetByCNPJ(string cnpj);
        ClienteDto Delete(int id);
        ClienteDto GetById(int id);
    }
}