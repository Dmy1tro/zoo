using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class DeviceRecordConfiguration : IEntityTypeConfiguration<DeviceRecord>
    {
        public void Configure(EntityTypeBuilder<DeviceRecord> builder)
        {
            builder.ToTable(DbTableName.DeviceRecord);

            builder.HasKey(x => x.DeviceRecordId);

            builder.Property(x => x.Value)
                .IsRequired()
                .HasMaxLength(LengthConstants.MediumLength);

            builder.HasOne(x => x.SmartDevice)
                .WithMany(s => s.DeviceRecords)
                .HasForeignKey(x => x.SmartDeviceId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
