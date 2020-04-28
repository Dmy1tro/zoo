using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.API.Configuration
{
    public static class ConfigurationHelper
    {
        public static IServiceCollection ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContextPool<ZooDbContext>(options =>
                options.UseSqlServer(configuration.GetSection("ConnectionStrings:ZooDb").Get<string>(),
                    m => m.MigrationsAssembly(typeof(ZooDbContext).Assembly.FullName)));

            return services;
        }

        public static IServiceCollection ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<Employee, IdentityRole>()
                .AddEntityFrameworkStores<ZooDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection ConfigureDiServices(this IServiceCollection services)
        {

            return services;
        }
    }
}
