using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.AccountViewModels;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public AccountController()
        {
            
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn(LoginViewModel model)
        {


            return Ok();
        }
    }
}