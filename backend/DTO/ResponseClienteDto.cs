using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using webnet.Enums;
using Canducci.Pagination;
using webnet.DAO;

namespace webnet.DTO
{
    public class ResponseClienteDto
    {   
        public Paginated<Cliente> items { get; set; }
        public int pagesCount { get; set; }
        public int totalItems { get; set; }
        public int itemsPerPage { get; set; }
        public int currentPage { get; set; }
    }
}
