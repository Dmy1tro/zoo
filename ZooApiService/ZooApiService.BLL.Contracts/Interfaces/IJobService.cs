using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IJobService
    {
        public Task<JobDto> GetJobAsync(int id);

        public Task<IList<JobDto>> GetJobsAsync();

        public Task<IList<JobDto>> GetJobsForEmployeeAsync(string employeeId);

        public Task<CreatedData> CreateJobAsync(JobDto employee);

        public Task UpdateJobAsync(JobDto employee);

        public Task DeleteJobAsync(int id);
    }
}
