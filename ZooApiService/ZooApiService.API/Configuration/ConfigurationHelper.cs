using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.BLL.Domain.Services;
using ZooApiService.Common.Authentication;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.DataBuilders;
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
            services.AddIdentity<Employee, IdentityRole>(options =>
                {
                    // Password
                    options.Password.RequiredLength = 6;
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;

                    // User
                    options.User.RequireUniqueEmail = true;
                    options.User.AllowedUserNameCharacters = null;
                })
                .AddEntityFrameworkStores<ZooDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection ConfigureDiServices(this IServiceCollection services)
        {
            services.AddScoped<IAnimalService, AnimalService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IRationService, RationService>();
            services.AddScoped<IAccountService, AccountService>();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    RequireExpirationTime = true,
                    ValidIssuer = configuration["Auth:Issuer"],
                    ValidAudience = configuration["Auth:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Auth:Key"]))
                };
            });

            return services;
        }

        public static IServiceCollection ConfigureAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyName.ForAllUsers, configure =>
                    configure.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, Role.Manager, Role.Worker));

                options.AddPolicy(PolicyName.ForManagersOnly, configure =>
                    configure.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, Role.Manager));
            });

            return services;
        }

        public static IApplicationBuilder MigrateDataBase(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ZooDbContext>();
            dbContext.Database.Migrate();

            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<Employee>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            new EmployeeDataBuilder(userManager, roleManager).SetData();

            return app;
        }
    }
}
