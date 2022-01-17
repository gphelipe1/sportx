using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.IO;
using Microsoft.EntityFrameworkCore;
using webnet.DAO;
using Microsoft.Extensions.Configuration;

namespace webnet.Context
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            //
        }

        public DbSet<User> User { get; set;}
        public DbSet<Cliente> Clientes { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json",false,true)
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("ServerConnection"));
        }

        protected override void OnModelCreating(ModelBuilder builder){
            
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.username).IsUnique();
            });

            builder.Entity<User>(entity => {
                entity.HasData(new User{
                    id=1,
                    username="admin",
                    password = BCrypt.Net.BCrypt.HashPassword("admin")
                });
            });

            builder.Entity<Cliente>(entity => {
                entity.HasIndex(c => c.email).IsUnique();
            });
        }
    }
}
