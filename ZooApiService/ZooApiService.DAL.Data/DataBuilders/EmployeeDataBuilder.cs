using System;
using Microsoft.AspNetCore.Identity;
using ZooApiService.Common.Authentication;
using ZooApiService.DAL.Data.Entities;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.DAL.Data.DataBuilders
{
    public class EmployeeDataBuilder
    {
        private readonly UserManager<Employee> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public EmployeeDataBuilder(UserManager<Employee> userManager,
                                   RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void SetData()
        {
            var user = _userManager.FindByEmailAsync("admin@admin.com").GetAwaiter().GetResult();

            if (user != null)
            {
                return;
            }

            var admin = new Employee
            {
                Email = "admin@admin.com",
                UserName = "Super|Admin",
                DateOfBirth = new DateTime(2000, 03, 13),
                Gender = Gender.Male,
                Position = JobPosition.Manager,
            };

            _userManager.CreateAsync(admin, "111111").GetAwaiter().GetResult();

            if (!_roleManager.RoleExistsAsync(Role.Manager).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(Role.Manager)).GetAwaiter().GetResult();
            }

            if (!_roleManager.RoleExistsAsync(Role.Worker).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(Role.Worker)).GetAwaiter().GetResult();
            }

            if (!_roleManager.RoleExistsAsync(Role.Admin).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(Role.Admin)).GetAwaiter().GetResult();
            }

            _userManager.AddToRoleAsync(admin, Role.Admin).GetAwaiter().GetResult();
        }
    }
}
