using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Encuentros.Data.Contexts
{
    public class EncuentrosContext : DbContext
    {
        private readonly string ConnectionString;
        public bool UseConsoleLogger { get; }

        public EncuentrosContext(string connectionString, bool useConsoleLogger)
        {
            ConnectionString = connectionString;
            UseConsoleLogger = useConsoleLogger;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddCommonEntities();
            modelBuilder.AddPilatesEntities();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);

            if (UseConsoleLogger)
            {
                ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
                {
                    builder
                        .AddFilter((category, level) =>
                            category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information)
                        .AddConsole();
                });

                optionsBuilder.UseLoggerFactory(loggerFactory).EnableSensitiveDataLogging();
            }
        }
    }
}