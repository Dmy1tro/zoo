using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using ZooApiService.API.ViewModels.UserViewModels;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Infrastructure
{
    public static class AuthHelper
    {
        public static UserData CreateRequestUser(ClaimsIdentity principal)
        {
            var claims = principal.Claims.ToList();

            var userData = new UserData
            {
                UserId = GetClaimValue(claims, CustomClaimName.Id),
                Role = GetClaimValue(claims, CustomClaimName.Role)
            };

            return userData;
        }

        private static string GetClaimValue(IEnumerable<Claim> claims, string claimName)
        {
            var claim = claims
                .FirstOrDefault(x => x.Type.Equals(claimName, StringComparison.InvariantCultureIgnoreCase));

            return claim?.Value;
        }
    }
}
