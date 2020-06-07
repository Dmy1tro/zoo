using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class SmartDeviceConfiguration : IEntityTypeConfiguration<SmartDevice>
    {
        public void Configure(EntityTypeBuilder<SmartDevice> builder)
        {
            builder.ToTable(DbTableName.SmartDevice);

            builder.HasKey(x => x.SmartDeviceId);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(LengthConstants.SmallLength);

            builder.HasOne(x => x.Animal)
                .WithMany(a => a.SmartDevices)
                .HasForeignKey(x => x.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
