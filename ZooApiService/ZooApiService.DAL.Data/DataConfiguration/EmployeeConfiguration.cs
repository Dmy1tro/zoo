using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.Common.Constants;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable(DbTableName.Employee);

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Role)
                .HasMaxLength(LengthConstants.SmallLength);

            builder.Property(x => x.ContentType)
                .HasMaxLength(LengthConstants.SmallLength);

            builder.Property(x => x.Id)
                .IsRequired()
                .HasMaxLength(36);
        }
    }
}
