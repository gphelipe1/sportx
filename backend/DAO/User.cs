using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
// using System.Text.Json.Serialization;
using Newtonsoft.Json;
using webnet.Enums;

namespace webnet.DAO
{
    public class User
    {   
        [Key]
        public int id { get; set; }
        
        [Required(ErrorMessage ="Este campo é Obrigatório")]
        [MaxLength(60, ErrorMessage ="Este campo deve conter no máximo 60 e no mínimo 2 caracteres")]
        [MinLength(2, ErrorMessage ="Este campo deve conter no máximo 60 e no mínimo 2 caracteres")]
        public string username { get; set; }

        [Required(ErrorMessage ="Este campo é Obrigatório")]
        [MinLength(8, ErrorMessage ="Este campo deve conter no mínimo 8 caracteres")]
        [JsonIgnore] public string password { get; set; }
        
        public string token { get; set; }
    }
}
