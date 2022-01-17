using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using webnet.DTO;
using webnet.DAO;

namespace webnet.Util
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            
            CreateMap<ClienteDto, Cliente>()
                .ForMember(x => x.Phones, opt => opt.MapFrom(src => string.Join(";", src.Telefones)));
            CreateMap<Cliente, ClienteDto>()
                .AfterMap((cliente,clienteDto)=>clienteDto.Telefones = cliente.Phones.Split(';').ToList());
        }
    }
}