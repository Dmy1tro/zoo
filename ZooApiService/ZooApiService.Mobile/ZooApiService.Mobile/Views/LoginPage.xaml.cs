using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using ZooApiService.Mobile.Constants;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Models.ViewModels;

namespace ZooApiService.Mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        private readonly HttpClient _httpClient;

        public LoginPage()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
        }

        public async void OnSignInClicked(object sender, EventArgs eventArgs)
        {
            var model = new LoginViewModel
            {
                Email = EmailEntry.Text,
                Password = PasswordEntry.Text
            };

            var (isValid, error) = model.Validate();

            if (!isValid)
            {
                await DisplayAlert("Error", error, "Ok");
                return;
            }

            (isValid, error) = await SignIn(JsonConvert.SerializeObject(model));

            if (isValid)
            {
                await DisplayAlert("Success", $"Token: {LocalStorage.GetItem("token")}", "Ok");
            }
            else
            {
                await DisplayAlert("Error", error, "Ok");
            }
        }

        private async Task<(bool, string)> SignIn(string request)
        {
            var stringContent = new StringContent(request, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(ApiUri.SignIn, stringContent);
            var raw = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var token = JsonConvert.DeserializeObject<TokenResponse>(raw);

                LocalStorage.AddItem("token", token.Token);

                return (true, null);
            }


            return (false, JsonConvert.DeserializeObject<ErrorResponse>(raw).Error);
        }
    }
}