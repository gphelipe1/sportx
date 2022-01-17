using webnet.DTO;
using webnet.DAO;

namespace webnet.Context
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByUsername(string username);
        User GetById(int id);
    }
}
