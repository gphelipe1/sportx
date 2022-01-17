using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using webnet.Enums;

namespace webnet.DAO
{
    public class Cliente: Base
    {   
        [Key]
        public int id { get; set; }
        
        [Required(ErrorMessage ="Este campo é Obrigatório")]
        [MaxLength(ErrorMessage ="Este campo deve possuir no Máximo 100 caracteres")]
        public string nome { get; set; }

        // Email do Cliente
        [Required(ErrorMessage ="Este campo é Obrigatório")]
        public string email { get; set; }

        // Tipo de Cliente (Pessoa Jur. ou Pessoa Fis.)
        [Required(ErrorMessage ="Este campo é Obrigatório")]
        public UserType Type {get; set;}

        //Classificacao do Cliente
        [Required(ErrorMessage ="Este campo é Obrigatório")]
        public ClassificacaoUser Classificacao { get; set; }

        public string CEP { get; set; }

        public string CPF { get; set; }

        public string CNPJ { get; set; }
        public string Phones { get; set; }
    }
}
