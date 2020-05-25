using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IJobService
    {
        Task<JobDto> GetJobAsync(int id);

        Task<IList<JobDto>> GetJobsAsync();

        Task<IList<JobDto>> GetJobsForEmployeeAsync(string employeeId, string minStatus);

        Task<CreatedData> CreateJobAsync(string employeeId, string title, string description);

        Task StartJobAsync(int id);

        Task FinishJobAsync(int id);

        Task UpdateJobAsync(JobDto jobDto);

        Task DeleteJobAsync(int id);
    }
}
