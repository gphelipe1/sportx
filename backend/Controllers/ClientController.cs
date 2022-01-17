using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using webnet.Context;
using webnet.DTO;
using webnet.Helpers;
using webnet.Enums;
using System;
using webnet.Services;
using Microsoft.AspNetCore.Authorization;

namespace webnet.Controllers
{

    [Route("v1/clientes")]
    [Produces("application/json")]
    [ApiController]
    
    public class ClientController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IClientService _service;


        public ClientController(IUserRepository repository, JwtService jwtService,IClientService service)
        {
            _repository = repository;
            _jwtService = jwtService;
            _service = service;
        }

        /// <summary>
        /// Return all the clients stored.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<List<ClienteDto>> GetAllClients()
        {
            try {

            var clientes = _service.GetAllClients();
            return clientes;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Updates a client from the database.
        /// </summary>
        /// <param id="id" >The Client's Id</param>
        /// <returns></returns>
        [HttpPut]
        [Route("update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<ClienteDto> Update([FromBody] ClienteDto clienteDto)
        {
            try {

            var cliente = _service.Update(clienteDto);
            return cliente;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Return a list of Clients by Types.
        /// </summary>
        /// <param type="Type" >The Type of Clients to Return</param>
        /// <returns></returns>
        [HttpGet]
        [Route("by-type")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<List<ClienteDto>> GetClientsByTypes(UserType type)
        {
            try {

            var clientes = _service.GetByType(type);
            return clientes;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Return a Client by CPF.
        /// </summary>
        /// <param CPF="CPF" >CPF</param>
        /// <returns></returns>
        [HttpGet]
        [Route("by-cpf")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<ClienteDto> GetByCPF(string cpf)
        {
            try {

            var cliente = _service.GetByCPF(cpf);
            return cliente;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Return a Client by CNPJ.
        /// </summary>
        /// <param CNPJ="CNPJ" >CNPJ</param>
        /// <returns></returns>
        [HttpGet]
        [Route("by-cnpj")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<ClienteDto> GetByCNPJ(string cnpj)
        {
            try {

            var cliente = _service.GetByCNPJ(cnpj);
            return cliente;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Save a new Client into the database.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<ClienteDto> Save([FromBody] ClienteDto clientDto)
        {
            try {

            var cliente = _service.Save(clientDto);
            return cliente;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }

        /// <summary>
        /// Delete a client from the database.
        /// </summary>
        /// <param id="id" >The Client's Id</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("delete")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        public ActionResult<ClienteDto> Delete(int id)
        {
            try {

            var cliente = _service.Delete(id);
            return cliente;

            } catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }
    }
}