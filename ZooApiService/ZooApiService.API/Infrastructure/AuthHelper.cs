using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using ZooApiService.API.ViewModels.UserViewModels;

namespace ZooApiService.API.Infrastructure
{
    public static class AuthHelper
    {
        public static UserData CreateRequestUser(ClaimsIdentity principal)
        {
            var claims = principal.Claims.ToList();

            var userData = new UserData
            {
                UserId = GetClaimValue(claims, ClaimsIdentity.DefaultNameClaimType),
                Role = GetClaimValue(claims, ClaimsIdentity.DefaultRoleClaimType)
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
