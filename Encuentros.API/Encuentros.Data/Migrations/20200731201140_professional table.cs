using Microsoft.EntityFrameworkCore.Migrations;

namespace Encuentros.Data.Migrations
{
    public partial class professionaltable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Professionals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    DocumentNumber = table.Column<string>(maxLength: 10, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Percentage = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Professionals", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Professionals_DocumentNumber",
                table: "Professionals",
                column: "DocumentNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Professionals");
        }
    }
}
