using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using webnet.DTO;
using webnet.DAO;
using webnet.Helpers;
using webnet.Context;

namespace webnet.Services
{
    public class UserService : IUserService
    {
        private readonly JwtService _appSettings;
        private readonly IUserRepository _repository;
        public UserService(IOptions<JwtService> appSettings,IUserRepository repository)
        {
            _appSettings = appSettings.Value;
            _repository = repository;
        }

        public User Authenticate(User user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Token Expires in 1 hour
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var usrToken = tokenHandler.WriteToken(token);

            user.token = "Bearer " + usrToken;
            // remove password before returning
            user.password = null;

            return user;
        }

        public User login(UserDto dto)
        {
            var user = _repository.GetByUsername(dto.username);

            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.password, user.password)){
                return null;
            }

            var auth = Authenticate(user);

            return auth;
        }
    }
}