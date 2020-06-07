using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IEmployeeService
    {
        Task<EmployeeDto> GetEmployeeAsync(string id);

        Task<IList<EmployeeDto>> GetEmployeesAsync();

        Task<CreatedData> CreateEmployeeAsync(EmployeeDto employeeDto);

        Task UpdateEmployeeAsync(EmployeeDto employeeDto);

        Task UpdatePicture(string id, byte[] pictureBytes, string contentType);

        Task DeleteEmployeeAsync(string id);
    }
}
