using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.JobViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    //[Authorize(Policy = PolicyName.ForAllUsers)]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;

        public JobController(IJobService jobService, IMapper mapper)
        {
            _jobService = jobService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobsDto = await _jobService.GetJobsAsync();

            return Ok(jobsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var jobDto = await _jobService.GetJobAsync(id);

            return Ok(jobDto);
        }

        [HttpGet("for-employee/{employeeId}/{jobStatus?}")]
        public async Task<IActionResult> GetJobForEmployee(string employeeId, string jobStatus)
        {
            var jobsDto = await _jobService.GetJobsForEmployeeAsync(employeeId, jobStatus);

            return Ok(jobsDto);
        }

        [HttpPost]
        //[Authorize(Policy = PolicyName.ForManagersOnly)]
        public async Task<IActionResult> Create(CreateJobViewModel model)
        {
            var createdId = await _jobService.CreateJobAsync(model.Title, model.Description);

            return Ok(createdId);
        }

        [HttpPut("start-job/{jobId}")]
        public async Task<IActionResult> StartJob(int jobId)
        {
            await _jobService.StartJobAsync(jobId);

            return NoContent();
        }

        [HttpPut("finish-job/{jobId}")]
        public async Task<IActionResult> FinishJob(int jobId)
        {
            await _jobService.FinishJobAsync(jobId);

            return NoContent();
        }

        [HttpPut]
        //[Authorize(Policy = PolicyName.ForManagersOnly)]
        public async Task<IActionResult> Put(JobViewModel model)
        {
            var jobDto = _mapper.Map<JobDto>(model);

            await _jobService.UpdateJobAsync(jobDto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        //[Authorize(Policy = PolicyName.ForManagersOnly)]
        public async Task<IActionResult> Delete(int id)
        {
            await _jobService.DeleteJobAsync(id);

            return NoContent();
        }
    }
}