using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAccountService
    {
        Task<string> SignIn(string email, string password);

        Task SignUp(EmployeeDto employee, string password);
    }
}
