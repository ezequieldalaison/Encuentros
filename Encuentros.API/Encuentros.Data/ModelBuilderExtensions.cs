﻿using Encuentros.Logic.Entities;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.EntityFrameworkCore;

namespace Encuentros.Data
{
    public static class ModelBuilderExtensions
    {
        public static void AddEntities(this ModelBuilder modelBuilder)
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

            modelBuilder.Entity<Student>(x =>
            {
                x.ToTable("Students");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
                x.Property(x => x.LastName).IsRequired().HasMaxLength(50);
                x.Property(x => x.Email).HasMaxLength(50);
                x.Property(x => x.PhoneNumber);
                x.Property(x => x.IsActive).IsRequired();
            });

            modelBuilder.Entity<Instructor>(x =>
            {
                x.ToTable("Instructors");
                x.HasKey(x => x.Id);
                x.Property(x => x.Name).IsRequired().HasMaxLength(50);
                x.Property(x => x.LastName).IsRequired().HasMaxLength(50);
                x.Property(x => x.IsActive).IsRequired();
            });

            modelBuilder.Entity<WeeklyClassStudent>()
                .ToTable("WeeklyClassStudents")
                .HasKey(cs => new { cs.WeeklyClassId, cs.StudentId });

            modelBuilder.Entity<WeeklyClassStudent>()
                .HasOne(pt => pt.Student)
                .WithMany(p => p.WeeklyClassStudents)
                .HasForeignKey(pt => pt.StudentId);

            modelBuilder.Entity<WeeklyClassStudent>()
                .HasOne(pt => pt.WeeklyClass)
                .WithMany(t => t.WeeklyClassStudents)
                .HasForeignKey(pt => pt.WeeklyClassId);

            modelBuilder.Entity<WeeklyClass>(x =>
            {
                x.ToTable("WeeklyClasses");
                x.HasKey(x => x.Id);
                x.Property(x => x.DayId).IsRequired();
                x.Property(x => x.Hour).IsRequired().HasMaxLength(10);
                x.HasOne(x => x.Instructor);
            });
        }
    }
}