using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.AccountViewModels;
using ZooApiService.API.ViewModels.EmployeeViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn(LoginViewModel model)
        {
            var token = await _accountService.SignIn(model.Email, model.Password);

            return Ok(new { token });
        }

        [HttpPost]
        [Authorize(Policy = PolicyName.ForManagersOnly)]
        public async Task<IActionResult> Create(CreateEmployeeViewModel model)
        {
            var employeeDto = _mapper.Map<EmployeeDto>((EmployeeViewModel)model);

            var createdData = await _accountService.SignUp(employeeDto, model.Password, model.Role);

            return Ok(createdData);
        }

        [HttpPut("change-password")]
        [Authorize(Policy = PolicyName.ForAllUsers)]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            await _accountService.ChangePassword(CurrentUser.UserId, model.CurrentPassword, model.NewPassword);

            return NoContent();
        }
    }
}