namespace ZooApiService.Common.Exceptions.BusinessLogic
{
    public class AuthenticationException : BusinessLogicException
    {
        public AuthenticationException() : base("Email or password is incorrect")
        {
        }
    }
}
