using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZooApiService.DAL.Data.Constants;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.DAL.Data.DataConfiguration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable(DbTableName.Employee);
        }
    }
}
