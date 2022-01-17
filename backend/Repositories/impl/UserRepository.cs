using System.Linq;

using webnet.DAO;

namespace webnet.Context
{
    public class UserRepository: IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.User.Add(user);
            _context.SaveChanges();

            return user;
        }

        public User GetByUsername(string username)
        {
            return _context.User.FirstOrDefault(u => u.username == username);
        }

        public User GetById(int id)
        {
            return _context.User.FirstOrDefault(u => u.id == id);
        }
    }
}