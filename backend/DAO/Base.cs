using System;

namespace webnet.DAO
{
    public class Base
    {
        public bool Active { get; set; } = true; 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}