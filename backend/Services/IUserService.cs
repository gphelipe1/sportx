using webnet.DAO;
using webnet.DTO;

namespace webnet.Services
{
    public interface IUserService
    {
        User Authenticate(User user);
        User login(UserDto dto);
    }
}