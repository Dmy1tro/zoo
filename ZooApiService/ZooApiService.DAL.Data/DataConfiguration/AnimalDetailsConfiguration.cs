using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class AnimalDetailsConfiguration : IEntityTypeConfiguration<AnimalDetails>
    {
        public void Configure(EntityTypeBuilder<AnimalDetails> builder)
        {
            builder.ToTable(DbTableName.AnimalDetails);

            builder.HasKey(x => x.AnimalDetailsId);

            builder.Property(x => x.AdditionalInfo)
                .HasMaxLength(LengthConstants.MediumLength);

            builder.HasOne(x => x.Animal)
                .WithOne(a => a.AnimalDetails)
                .HasForeignKey<AnimalDetails>(x => x.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
