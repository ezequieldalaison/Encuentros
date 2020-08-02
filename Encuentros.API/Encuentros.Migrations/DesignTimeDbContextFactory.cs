using Encuentros.Data.Contexts;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace Encuentros.Migrations
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<EncuentrosContext>
    {
        public EncuentrosContext CreateDbContext(string[] args)
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                .AddJsonFile($"appsettings.{envName}.json", optional: false)
                .Build();

            if (string.IsNullOrEmpty(configuration.GetConnectionString("DefaultConnection")))
                throw new Exception("Can't read connection string");

            return new EncuentrosContext(configuration.GetConnectionString("DefaultConnection"), true);
        }
    }
}