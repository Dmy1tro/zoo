using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class AnimalConfiguration : IEntityTypeConfiguration<Animal>
    {
        public void Configure(EntityTypeBuilder<Animal> builder)
        {
            builder.ToTable(DbTableName.Animal);

            builder.HasKey(x => x.AnimalId);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(LengthConstants.SmallLength);

            builder.HasOne(x => x.AnimalType)
                .WithMany(t => t.Animals)
                .HasForeignKey(x => x.AnimalTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
