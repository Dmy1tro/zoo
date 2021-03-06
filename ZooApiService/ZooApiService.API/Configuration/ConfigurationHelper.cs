﻿using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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
                options.UseSqlServer(configuration["ConnectionStrings:ZooDb"],
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
            services.AddScoped<IAnimalDetailsService, AnimalDetailsService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IAnimalTypeService, AnimalTypeService>();
            services.AddScoped<IDeviceRecordService, DeviceRecordService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IRationService, RationService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<ISmartDeviceService, SmartDeviceService>();

            return services;
        }

        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ZooApiService Swagger API"
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });

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
                    configure.RequireClaim(CustomClaimName.Role, Role.Manager, Role.Worker, Role.Admin));

                options.AddPolicy(PolicyName.ForManagersOnly, configure =>
                    configure.RequireClaim(CustomClaimName.Role, Role.Manager, Role.Admin));

                options.AddPolicy(PolicyName.ForAdmins, configure =>
                    configure.RequireClaim(CustomClaimName.Role, Role.Admin));
            });

            return services;
        }

        public static IApplicationBuilder RunSPAonSamePort(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) => 
            {
                await next();

                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseStaticFiles(new StaticFileOptions 
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "SPA"))
            });

            return app;
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
