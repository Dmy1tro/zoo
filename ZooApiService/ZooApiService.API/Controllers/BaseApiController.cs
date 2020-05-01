using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ZooApiService.API.Infrastructure;
using ZooApiService.API.ViewModels.UserViewModels;

namespace ZooApiService.API.Controllers
{
    public abstract class BaseApiController : Controller
    {
        protected UserData CurrentUser;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            CurrentUser = AuthHelper.CreateRequestUser(HttpContext.User.Identity as ClaimsIdentity);
        }
    }
}