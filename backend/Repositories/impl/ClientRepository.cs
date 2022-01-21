using System.Linq;
using System.Collections.Generic;
using webnet.DAO;
using webnet.Enums;
using webnet.DTO;
using Microsoft.EntityFrameworkCore;
using Canducci.Pagination;

namespace webnet.Context
{
    public class ClientRepository: IClientRepository
    {
        private readonly DataContext _context;

        public ClientRepository(DataContext context)
        {
            _context = context;
        }

        public Cliente Create(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();

            return cliente;
        }

        public Cliente Update(Cliente cliente)
        {
            _context.Clientes.Update(cliente);
            _context.SaveChanges();
            return cliente;
        }

        public List<Cliente> GetAll()
        {
            var clientes = _context.Clientes.ToList();
            return clientes;
        }

        public Paginated<Cliente> GetAllPaginated(int page, int size)
        {
            var result = _context.Clientes.AsNoTracking().OrderBy(c => c.id).ToPaginated(page,size);
            return result;
        }

        public List<Cliente> GetByUserType(UserType type)
        {
            return _context.Clientes.Where(c => c.Type == type).ToList();
        }

        public Cliente GetByEmail(string email)
        {
            return _context.Clientes.FirstOrDefault(c => c.email == email);
        }

        public Cliente GetById(int id)
        {
            return _context.Clientes.FirstOrDefault(c => c.id == id);
        }

        public List<Cliente> GetByClassification(ClassificacaoUser classif)
        {
            return _context.Clientes.Where(c => c.Classificacao == classif).ToList();
        }

        public Cliente GetByCPF(string cpf)
        {
            return _context.Clientes.FirstOrDefault(c => c.CPF == cpf);
        }

        public Cliente GetByCNPJ(string cnpj)
        {
            return _context.Clientes.FirstOrDefault(c => c.CNPJ == cnpj);
        }

        public Cliente Delete(int id)
        {
            var client = _context.Clientes.FirstOrDefault(c => c.id == id);
            _context.Clientes.Remove(client);
            _context.SaveChanges();
            return client;
        }
    }
}