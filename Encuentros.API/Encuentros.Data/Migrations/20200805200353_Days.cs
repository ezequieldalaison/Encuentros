using Microsoft.EntityFrameworkCore.Migrations;

namespace Encuentros.Data.Migrations
{
    public partial class Days : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyClasses_Days_DayId",
                table: "WeeklyClasses",
                column: "DayId",
                principalTable: "Days",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyClasses_Days_DayId",
                table: "WeeklyClasses");

            migrationBuilder.DropTable(
                name: "Days");
        }
    }
}
