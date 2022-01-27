using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using webnet.Enums;
using webnet.DTO;
using webnet.DAO;
using AutoMapper;
using webnet.Helpers;
using webnet.Context;
using Canducci.Pagination;

namespace webnet.Services
{
    public class ClientService : IClientService
    {
        private readonly JwtService _appSettings;
        private readonly IClientRepository _repository;
        private readonly IMapper _mapper;
        public ClientService(IOptions<JwtService> appSettings,IClientRepository repository,IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _repository = repository;
            _mapper = mapper;
        }

        public ClienteDto Save(ClienteDto dto)
        {
            var client = _repository.Create(_mapper.Map<ClienteDto, Cliente>(dto));
            var clientDto = _mapper.Map<Cliente, ClienteDto>(client);
            return clientDto;
        }

        public ClienteDto Update(ClienteDto dto)
        {
            var updated = _repository.Update(_mapper.Map<ClienteDto, Cliente>(dto));
            var updatedDTO = _mapper.Map<Cliente, ClienteDto>(updated);
            return updatedDTO;
        }

        public List<ClienteDto> GetByType(UserType type)
        {
            var clients =_repository.GetByUserType(type);
            var clientsDto = _mapper.Map<List<Cliente>, List<ClienteDto>>(clients);
            return clientsDto;
        }

        public ResponseClienteDto GetAllClients(int page, int size)
        {
            var result = _repository.GetAllPaginated(page, size);
            return result;
        }

        public ClienteDto GetByCPF(string cpf)
        {
            var client = _repository.GetByCPF(cpf);
            if(client == null)
            { 
                return null;
            }

            return _mapper.Map<Cliente, ClienteDto>(client);
        }

        public ClienteDto GetByCNPJ(string cnpj)
        {
            var client = _repository.GetByCNPJ(cnpj);
            if(client == null)
            { 
                return null;
            }

            return _mapper.Map<Cliente, ClienteDto>(client);
        }

        public ClienteDto GetById(int id)
        {
            var client = _repository.GetById(id);
            if(client == null)
            { 
                return null;
            }

            return _mapper.Map<Cliente, ClienteDto>(client);
        }

        public  ClienteDto Delete(int id)
        {
            var cliente = _repository.Delete(id);
            var clienteDto = _mapper.Map<Cliente, ClienteDto>(cliente);
            return clienteDto;
        }
    }
}