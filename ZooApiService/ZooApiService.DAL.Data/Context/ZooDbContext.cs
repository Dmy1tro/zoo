using Microsoft.EntityFrameworkCore;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.Context
{
    public class ZooDbContext : DbContext
    {
        public ZooDbContext(DbContextOptions<ZooDbContext> options) : base(options) { }

        public DbSet<Animal> Animals { get; set; }

        public DbSet<AnimalType> AnimalTypes { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<FoodType> FoodTypes { get; set; }

        public DbSet<MedicalCard> MedicalCards { get; set; }

        public DbSet<MedicalRecord> MedicalRecords { get; set; }

        public DbSet<Profession> Professions { get; set; }

        public DbSet<Ration> Rations { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public DbSet<StaffWork> StaffWorks { get; set; }

        public DbSet<Work> Works { get; set; }
    }
}
