using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.Context
{
    public class ZooDbContext : IdentityDbContext<Employee>
    {
        public DbSet<Animal> Animals { get; set; }

        public DbSet<AnimalDetails> AnimalDetails { get; set; }

        public DbSet<AnimalType> AnimalTypes { get; set; }
        
        public DbSet<DeviceRecord> DeviceRecords { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Ration> Rations { get; set; }

        public DbSet<SmartDevice> SmartDevices { get; set; }

        public ZooDbContext(DbContextOptions<ZooDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ZooDbContext).Assembly);
        }
    }
}
