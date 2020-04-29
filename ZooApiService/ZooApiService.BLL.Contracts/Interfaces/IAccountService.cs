using System.Threading.Tasks;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAccountService
    {
        Task<string> SignIn(string login, string password);
    }
}
