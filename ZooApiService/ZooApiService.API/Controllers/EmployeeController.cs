using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.EmployeeViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/employees")]
    [ApiController]
    //[Authorize(Policy = PolicyName.ForManagersOnly)]
    public class EmployeeController : BaseApiController
    {
        private readonly IEmployeeService _employeeService;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService,
                                  IAccountService accountService,
                                  IMapper mapper)
        {
            _employeeService = employeeService;
            _accountService = accountService;
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

        [HttpGet("profile")]
        //[Authorize(Policy = PolicyName.ForAllUsers)]
        public async Task<IActionResult> Profile()
        {
            var employeeDto = await _employeeService.GetEmployeeAsync(CurrentUser.UserId);

            return Ok(employeeDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeViewModel model)
        {
            var employeeDto = _mapper.Map<EmployeeDto>((EmployeeViewModel)model);

            await _accountService.SignUp(employeeDto, model.Password, model.Role);

            return NoContent();
        }

        [HttpPut("change-password")]
        //[Authorize(Policy = PolicyName.ForAllUsers)]
        public async Task<IActionResult> ChangePassword(ChangePassword model)
        {
            await _accountService.ChangePassword(CurrentUser.UserId, model.OldPassword, model.NewPassword);

            return NoContent();
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