using System.Linq;
using System.Collections.Generic;
using webnet.DAO;
using webnet.DTO;
using webnet.Enums;
using Canducci.Pagination;

namespace webnet.Context
{
    public interface IClientRepository
    {
        Cliente Create(Cliente cliente);
        Cliente Update(Cliente cliente);
        List<Cliente> GetAll();
        Paginated<Cliente> GetAllPaginated(int page, int size);
        List<Cliente> GetByUserType(UserType type);
        Cliente GetByEmail(string email);
        Cliente GetByCPF(string cpf);
        Cliente GetByCNPJ(string cnpj);
        Cliente GetById(int id);
        List<Cliente> GetByClassification(ClassificacaoUser classif);
        Cliente Delete(int id);
    }
}
