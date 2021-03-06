﻿using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAccountService
    {
        Task<string> SignIn(string email, string password);

        Task<CreatedData> SignUp(EmployeeDto employee, string password, string role);

        Task ChangePassword(string id, string oldPassword, string newPassword);

        Task ChangeRole(string id, string role);
    }
}
