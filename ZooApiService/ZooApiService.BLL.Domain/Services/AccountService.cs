using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<Employee> _userManager;
        private readonly JwtSettings _jwtSettings;

        public AccountService(UserManager<Employee> userManager, IOptions<JwtSettings> jwtOptions)
        {
            _userManager = userManager;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<string> SignIn(string email, string password)
        {
            var employee = await _userManager.FindByEmailAsync(email);

            if (employee is null || (await _userManager.CheckPasswordAsync(employee, password)))
            {
                throw new AuthenticationException();
            }

            var token = await GenerateToken(employee);

            return token;
        }

        public async Task SignUp(EmployeeDto employeeDto)
        {
            //var user = new User
            //{
            //    UserName = model.Name,
            //    Email = model.Email,
            //    SecurityStamp = Guid.NewGuid().ToString()
            //};

            //var result = await userManager.CreateAsync(user, model.Password);

            //if (!result.Succeeded)
            //    return new RegisterResult(result.Errors.Select(x => x.Description));

            //await CheckRoleExists(Roles.userRole);

            //await userManager.AddToRoleAsync(user, Roles.userRole);

            throw new NotImplementedException();
        }


        private async Task<string> GenerateToken(Employee employee)
        {
            var roles = await _userManager.GetRolesAsync(employee);

            var claims = roles
                .Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role))
                .ToList();

            claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, employee.Id));

            var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                signingCredentials: new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256));

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }
    }
}
