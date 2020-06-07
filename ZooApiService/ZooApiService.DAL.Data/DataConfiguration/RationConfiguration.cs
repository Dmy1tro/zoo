using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class RationConfiguration : IEntityTypeConfiguration<Ration>
    {
        public void Configure(EntityTypeBuilder<Ration> builder)
        {
            builder.ToTable(DbTableName.Ration);

            builder.HasKey(x => x.RationId);

            builder.Property(x => x.FoodName)
                .IsRequired()
                .HasMaxLength(LengthConstants.SmallLength);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(LengthConstants.MediumLength);

            builder.HasIndex(x => x.AnimalId);

            builder.HasOne(x => x.Animal)
                .WithMany()
                .HasForeignKey(x => x.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
