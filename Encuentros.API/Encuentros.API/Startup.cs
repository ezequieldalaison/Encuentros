using Encuentros.Data.IoCExtensions;
using Encuentros.EntityMapper.IoCExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.IO;

namespace Encuentros.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000", "https://encuentros-prueba.azurewebsites.net", "https://equipoencuentros.azurewebsites.net")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            services.AddControllers()
                .AddNewtonsoftJson(a =>
                {
                    a.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    a.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                }); ;

            services.AddDbContext();
            services.AddRepositories();
            services.AddAutomapper();

            AddSwagger(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(errorApp =>
                {
                    errorApp.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "text/html";

                        var exceptionHandlerPathFeature =
                            context.Features.Get<IExceptionHandlerPathFeature>();

                        await context.Response.WriteAsync("<html lang=\"en\"><body>\r\n Se produjo un error! <br /><br />\r\n" + exceptionHandlerPathFeature.Error.Message + " </body></html>\r\n");

                        var configuration = new ConfigurationBuilder()
                            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                            .AddJsonFile($"appsettings.json", optional: false)
                            .Build();

                        if (string.IsNullOrEmpty(configuration.GetConnectionString("DefaultConnection")))
                            throw new Exception("Can't read connection string");

                        await context.Response.WriteAsync(configuration.GetConnectionString("DefaultConnection"));
                    });
                });

                app.UseHsts();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void AddSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                var groupName = "v1";

                options.SwaggerDoc(groupName, new OpenApiInfo
                {
                    Title = $"Encuentros",
                    Version = groupName,
                    Description = "Aplicación Encuentros",
                    Contact = new OpenApiContact
                    {
                        Name = "Encuentros",
                        Email = string.Empty,
                        Url = new Uri("https://encuentros.com/"),
                    }
                });
            });
        }
    }
}
