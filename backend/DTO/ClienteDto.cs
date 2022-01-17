using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using webnet.Enums;

namespace webnet.DTO
{
    public class ClienteDto
    {   
        public int id { get; set; }

        public string nome { get; set; }

        public string email { get; set; }

        public UserType Type {get; set;}

        public ClassificacaoUser Classificacao { get; set; }

        public string CEP { get; set; }

        [JsonProperty(NullValueHandling=NullValueHandling.Ignore)]
        public string CPF { get; set; }

        [JsonProperty(NullValueHandling=NullValueHandling.Ignore)]
        public string CNPJ { get; set; }

        public List<string> Telefones { get; set; }
    }
}
