using Encuentros.Data.Contexts;
using Encuentros.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;

namespace Encuentros.Data.IoCExtensions
{
    public static class IoCExtensions
    {
        public static void AddDbContext(this IServiceCollection services)
        {
            services.AddScoped<DbContext>(_ => new EncuentrosContext(GetConnectionString(), true));
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            //services.AddScoped<IGenericRepository<Professional>, GenericRepository<Professional>>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(IGenericAIRepository<>), typeof(GenericAIRepository<>));
        }

        private static string GetConnectionString()
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                .AddJsonFile($"appsettings.{envName}.json", optional: false)
                .Build();

            if (string.IsNullOrEmpty(configuration.GetConnectionString("DefaultConnection")))
                throw new Exception("Can't read connection string");

            return configuration.GetConnectionString("DefaultConnection");
        }
    }
}