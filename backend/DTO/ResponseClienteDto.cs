using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using webnet.Enums;

namespace webnet.DTO
{
    public class ResponseClienteDto
    {   
        public List<ClienteDto> items { get; set; }
        public int pageCount { get; set; }
        public int totalItemCount { get; set; }
        public int pageSize { get; set; }
        public int hasPreviousPage { get; set;}
        public bool isFirstPage { get; set; }
        public bool isLastPage { get; set; }
        public int firstItemOnPage { get;set;}
        public int lastItemOnPage { get; set; }
    }
}
