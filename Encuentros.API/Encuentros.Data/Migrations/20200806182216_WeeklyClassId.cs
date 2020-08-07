using Microsoft.EntityFrameworkCore.Migrations;

namespace Encuentros.Data.Migrations
{
    public partial class WeeklyClassId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WeeklyClassStudents",
                table: "WeeklyClassStudents");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "WeeklyClassStudents",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WeeklyClassStudents",
                table: "WeeklyClassStudents",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyClassStudents_WeeklyClassId_StudentId",
                table: "WeeklyClassStudents",
                columns: new[] { "WeeklyClassId", "StudentId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WeeklyClassStudents",
                table: "WeeklyClassStudents");

            migrationBuilder.DropIndex(
                name: "IX_WeeklyClassStudents_WeeklyClassId_StudentId",
                table: "WeeklyClassStudents");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "WeeklyClassStudents");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WeeklyClassStudents",
                table: "WeeklyClassStudents",
                columns: new[] { "WeeklyClassId", "StudentId" });
        }
    }
}
