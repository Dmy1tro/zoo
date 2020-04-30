using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.AccountViewModels;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn(LoginViewModel model)
        {
            var token = await _accountService.SignIn(model.Email, model.Password);

            return Ok(new { token });
        }
    }
}