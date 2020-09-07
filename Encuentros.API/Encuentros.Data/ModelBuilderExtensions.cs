using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.EntityFrameworkCore;

namespace Encuentros.Data
{
    public static class ModelBuilderExtensions
    {
        public static void AddCommonEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Day>(x =>
            {
                x.ToTable("Days");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Month>(x =>
            {
                x.ToTable("Months");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<JournalSide>(x =>
            {
                x.ToTable("JournalSides");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<MovementStatus>(x =>
            {
                x.ToTable("MovementStatuses");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Area>(x =>
            {
                x.ToTable("Areas");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Concept>(x =>
            {
                x.ToTable("Concepts");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name);
                x.Property(x => x.IsActive);
                x.HasOne(x => x.Area);
                x.HasOne(x => x.JournalSide);
            });

            modelBuilder.Entity<Movement>(x =>
            {
                x.ToTable("Movements");
                x.HasKey(x => x.Id);
                x.Property(x => x.Date);
                x.Property(x => x.Amount);
                x.Property(x => x.Comments);
                x.HasOne(x => x.Concept);
                x.Property(x => x.ConceptId);
                x.HasOne(x => x.MovementStatus);
                x.Property(x => x.MovementStatusId);
            });

            modelBuilder.Entity<Professional>(x =>
            {
                x.ToTable("Professionals");
                x.HasKey(x => x.Id);
                x.HasIndex(t => t.DocumentNumber).IsUnique();
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
                x.Property(x => x.LastName).IsRequired().HasMaxLength(50);
                x.Property(x => x.DocumentNumber).IsRequired().HasMaxLength(10);
                x.Property(x => x.Email).HasMaxLength(50);
                x.Property(x => x.PhoneNumber);
                x.Property(x => x.Percentage);
                x.Property(x => x.IsActive).IsRequired();
            });

            modelBuilder.Entity<ProfessionalArea>(x =>
            {
                x.ToTable("ProfessionalAreas");
                x.HasKey(x => x.Id);
                x.HasIndex(x => new { x.ProfessionalId, x.AreaId }).IsUnique();
                x.HasOne(x => x.Professional)
                    .WithMany(x => x.ProfessionalAreas)
                    .HasForeignKey(x => x.ProfessionalId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void AddPilatesEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>(x =>
            {
                x.ToTable("Students");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
                x.Property(x => x.LastName).IsRequired().HasMaxLength(50);
                x.Property(x => x.Email).HasMaxLength(50);
                x.Property(x => x.PhoneNumber);
                x.Property(x => x.IsActive).IsRequired();
                x.HasMany(x => x.Fees).WithOne(x => x.Student);
            });

            modelBuilder.Entity<WeeklyClassStudent>(x =>
            {
                x.ToTable("WeeklyClassStudents");
                x.HasKey(x => x.Id);
                x.Property(x => x.DateFrom);
                x.HasIndex(x => new { x.WeeklyClassId, x.StudentId }).IsUnique();
            });

            modelBuilder.Entity<WeeklyClassStudent>()
                .HasOne(x => x.Student)
                .WithMany(x => x.WeeklyClassStudents)
                .HasForeignKey(x => x.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WeeklyClassStudent>()
                .HasOne(x => x.WeeklyClass)
                .WithMany(x => x.WeeklyClassStudents)
                .HasForeignKey(x => x.WeeklyClassId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WeeklyClass>(x =>
            {
                x.ToTable("WeeklyClasses");
                x.HasKey(x => x.Id);
                x.Property(x => x.Hour).IsRequired().HasMaxLength(10);
                x.Property(x => x.IsActive);
                x.Property(x => x.ProfessionalId);
                x.HasOne(x => x.Professional);
                x.HasOne(x => x.Day);
            });

            modelBuilder.Entity<IndividualClassStudent>(x =>
            {
                x.ToTable("IndividualClassStudents");
                x.HasKey(x => x.Id);
                x.HasOne(x => x.WeeklyClass);
                x.HasOne(x => x.Student);
                x.HasIndex(x => new { x.WeeklyClassId, x.StudentId }).IsUnique();
            });

            modelBuilder.Entity<FeeType>(x =>
            {
                x.ToTable("FeeTypes");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
                x.Property(x => x.Amount);
            });

            modelBuilder.Entity<Fee>(x =>
            {
                x.ToTable("Fees");
                x.HasKey(x => x.Id);
                x.HasOne(x => x.Student)
                    .WithMany(x => x.Fees);
                x.HasOne(x => x.FeeType);
                x.HasOne(x => x.Month);
                x.HasOne(x => x.Movement);
            });

            modelBuilder.Entity<ProfessionalWorkDay>(x =>
            {
                x.ToTable("ProfessionalWorkDays");
                x.HasKey(x => x.Id);
                x.Property(x => x.Date);
                x.Property(x => x.QuantityHours);
                x.Property(x => x.ProfessionalId);
                x.HasOne(x => x.Professional);
            });
        }
    }
}