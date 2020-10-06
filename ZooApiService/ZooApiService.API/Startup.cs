using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ZooApiService.API.Configuration;
using ZooApiService.API.Mapping;
using ZooApiService.API.Middleware;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));

            services.ConfigureDbContext(Configuration);

            services.ConfigureIdentity();

            services.Configure<JwtSettings>(Configuration.GetSection("Auth"));

            services.AddJwtAuthentication(Configuration);

            services.ConfigureAuthorization();

            services.ConfigureDiServices();

            services.AddCors();

            services.AddControllers();

            services.ConfigureSwagger();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseMiddleware<RequestPerformanceMiddleware>();
            app.UseMiddleware<ErrorHandlingMiddleware>();

            //app.UseHttpsRedirection();

            app.UseCors(options =>
                options.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "ZooApiService"));

            app.MigrateDataBase();
        }
    }
}
