namespace ZooApiService.Mobile.Models.ViewModels
{
    public class LoginViewModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public (bool, string) Validate()
        {
            if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
            {
                return (false, "All inputs are required");
            }

            return (true, null);
        }
    }
}
