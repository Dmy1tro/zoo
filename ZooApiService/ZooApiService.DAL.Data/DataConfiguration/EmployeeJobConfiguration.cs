using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class EmployeeJobConfiguration : IEntityTypeConfiguration<EmployeeJob>
    {
        public void Configure(EntityTypeBuilder<EmployeeJob> builder)
        {
            builder.ToTable(DbTableName.EmployeeJob);

            builder.HasKey(x => x.EmployeeJobId);
            builder.Property(x => x.EmployeeId)
                .IsRequired();

            builder.HasIndex(x => x.EmployeeId);
            builder.HasIndex(x => x.JobId);

            builder.HasOne(x => x.Job)
                .WithMany()
                .HasForeignKey(x => x.JobId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Employee)
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
