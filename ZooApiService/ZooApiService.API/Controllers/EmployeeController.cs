using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.EmployeeViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeService.GetEmployeesAsync();

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var employeeDto = await _employeeService.GetEmployeeAsync(id);

            return Ok(employeeDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EmployeeViewModel model)
        {
            var employeeDto = _mapper.Map<EmployeeDto>(model);

            var createdId = await _employeeService.CreateEmployeeAsync(employeeDto);

            return Ok(createdId);
        }

        [HttpPut]
        public async Task<IActionResult> Put(EmployeeViewModel model)
        {
            var employeeDto = _mapper.Map<EmployeeDto>(model);

            await _employeeService.UpdateEmployeeAsync(employeeDto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _employeeService.DeleteEmployeeAsync(id);

            return NoContent();
        }
    }
}