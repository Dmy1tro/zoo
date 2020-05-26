using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;
using ZooApiService.Common.Exceptions;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<Employee> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;

        public AccountService(UserManager<Employee> userManager,
                              RoleManager<IdentityRole> roleManager,
                              IOptions<JwtSettings> jwtOptions,
                              IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<string> SignIn(string email, string password)
        {
            var employee = await _userManager.FindByEmailAsync(email);

            if (employee is null || (!await _userManager.CheckPasswordAsync(employee, password)))
            {
                throw new BusinessLogicException("Email or password is incorrect.");
            }

            var token = await GenerateToken(employee);

            return token;
        }

        public async Task<CreatedData> SignUp(EmployeeDto employeeDto, string password, string role)
        {
            var employee = _mapper.Map<Employee>(employeeDto);

            var result = await _userManager.CreateAsync(employee, password);

            if (!result.Succeeded)
                throw new BusinessLogicException(string.Join("\n", result.Errors.Select(x => x.Description)));

            await CheckRoleExists(role);

            await _userManager.AddToRoleAsync(employee, role);

            return new CreatedData(employee.Id);
        }

        public async Task ChangePassword(string id, string oldPassword, string newPassword)
        {
            var employee = await _userManager.FindByIdAsync(id);

            var result = await _userManager.ChangePasswordAsync(employee, oldPassword, newPassword);

            if (!result.Succeeded)
            {
                throw new BusinessLogicException(string.Join("\n", result.Errors.Select(x => x.Description)));
            }
        }

        private async Task CheckRoleExists(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        private async Task<string> GenerateToken(Employee employee)
        {
            var role = (await _userManager.GetRolesAsync(employee)).First();

            var claims = new List<Claim>
            {
                new Claim(CustomClaimName.Id, employee.Id),
                new Claim(CustomClaimName.Role, role),
                new Claim(CustomClaimName.UserName, employee.UserName.Replace('|', ' '))
            };

            var expires = DateTime.Now.AddHours(2);
            var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var credentials = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }
    }
}
