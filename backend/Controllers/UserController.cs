using Microsoft.AspNetCore.Mvc;
using webnet.Context;
using webnet.DAO;
using webnet.DTO;
using webnet.Helpers;
using webnet.Services;
using Microsoft.AspNetCore.Authorization;

namespace webnet.Controllers
{
    [Route("v1/user")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IUserService _service;


        public UserController(IUserRepository repository, JwtService jwtService,IUserService service)
        {
            _repository = repository;
            _jwtService = jwtService;
            _service = service;
        }

        /// <summary>
        /// User Login - admin / admin (DEFAULT)
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login(UserDto dto)
        {
            var logged = _service.login(dto);
            //If username and passoword passed on DTO exists)
            if (logged != null) {
                
                return Ok(logged);
            
            }else{
            
                return Unauthorized("Credenciais Inválidas");
            
            }
        }
    }
}
