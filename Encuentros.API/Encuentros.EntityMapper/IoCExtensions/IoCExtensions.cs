using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Encuentros.EntityMapper.IoCExtensions
{
    public static class IoCExtensions
    {
        public static void AddAutomapper(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}