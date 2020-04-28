using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IEmployeeService
    {
        public Task<EmployeeDto> GetEmployeeAsync(string id);

        public Task<IList<EmployeeDto>> GetEmployeesAsync();

        public Task<CreatedData> CreateEmployeeAsync(EmployeeDto employee);

        public Task UpdateEmployeeAsync(EmployeeDto employee);

        public Task DeleteEmployeeAsync(string id);
    }
}
