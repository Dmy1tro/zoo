using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Models.ViewModels;
using ZooApiService.Mobile.Services;

namespace ZooApiService.Mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        private readonly ApiService _apiService;

        public LoginPage()
        {
            InitializeComponent();
            _apiService = new ApiService();
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

            MessagingCenter.Send(this, "SignIn");

            await Navigation.PushAsync(new ItemsPage());

            (isValid, error) = await _apiService.SignIn(model.Email, model.Password);

            if (isValid)
            {
                await DisplayAlert("Success", $"Token: {LocalStorage.GetItem("token")}", "Ok");

                await Navigation.PushAsync(new ItemsPage());
            }
            else
            {
                await DisplayAlert("Error", error, "Ok");
            }
        }

    }
}