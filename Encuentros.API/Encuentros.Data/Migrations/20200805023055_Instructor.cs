using Microsoft.EntityFrameworkCore.Migrations;

namespace Encuentros.Data.Migrations
{
    public partial class Instructor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "InstructorId",
                table: "WeeklyClasses",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyClasses_InstructorId",
                table: "WeeklyClasses",
                column: "InstructorId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyClasses_Instructors_InstructorId",
                table: "WeeklyClasses",
                column: "InstructorId",
                principalTable: "Instructors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyClasses_Instructors_InstructorId",
                table: "WeeklyClasses");

            migrationBuilder.DropTable(
                name: "Instructors");

            migrationBuilder.DropIndex(
                name: "IX_WeeklyClasses_InstructorId",
                table: "WeeklyClasses");

            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "WeeklyClasses");
        }
    }
}
