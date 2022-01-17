using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace webnet.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    nome = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Classificacao = table.Column<int>(nullable: false),
                    CEP = table.Column<string>(nullable: true),
                    CPF = table.Column<string>(nullable: true),
                    CNPJ = table.Column<string>(nullable: true),
                    Phones = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(maxLength: 60, nullable: false),
                    password = table.Column<string>(nullable: false),
                    token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "id", "password", "token", "username" },
                values: new object[] { 1, "$2a$11$50HOoefT8zjVVmtWIgqoZ.7Yj81OAm7beEOz.FmfO2kD8mA9wRFoq", null, "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_email",
                table: "Clientes",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_username",
                table: "User",
                column: "username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
