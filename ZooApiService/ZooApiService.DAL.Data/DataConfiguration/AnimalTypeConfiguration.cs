using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class AnimalTypeConfiguration : IEntityTypeConfiguration<AnimalType>
    {
        public void Configure(EntityTypeBuilder<AnimalType> builder)
        {
            builder.ToTable(DbTableName.AnimalType);

            builder.HasKey(x => x.AnimalTypeId);

            builder.Property(x => x.TypeName)
                .IsRequired()
                .HasMaxLength(LengthConstants.SmallLength);

            builder.HasIndex(x => x.TypeName)
                .IsUnique();
        }
    }
}
