using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.ToTable(DbTableName.Job);

            builder.HasKey(x => x.JobId);

            builder.Property(x => x.EmployeeId)
                .IsRequired()
                .HasMaxLength(36);

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(LengthConstants.SmallLength);

            builder.Property(x => x.Description)
                .HasMaxLength(LengthConstants.MediumLength);

            builder.HasOne(x => x.Employee)
                .WithMany(e => e.Jobs)
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
