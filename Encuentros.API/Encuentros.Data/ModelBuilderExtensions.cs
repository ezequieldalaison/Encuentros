using Encuentros.Logic.Entities;
using Microsoft.EntityFrameworkCore;

namespace Encuentros.Data
{
    public static class ModelBuilderExtensions
    {
        public static void AddProfessionalEntity(this ModelBuilder modelBuilder)
        {
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
        }
    }
}