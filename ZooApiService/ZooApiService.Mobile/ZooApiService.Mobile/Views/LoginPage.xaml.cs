using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Models;
using ZooApiService.Mobile.Models.ViewModels;
using ZooApiService.Mobile.Services;

namespace ZooApiService.Mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        private readonly ApiService _apiService;
        MainPage RootPage { get => Application.Current.MainPage as MainPage; }

        public LoginPage()
        {
            InitializeComponent();
            _apiService = new ApiService();
            SetLabels();
            MessagingCenter.Subscribe<Settings>(this, "l", s =>
            {
                SetLabels();
            });
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

            (isValid, error) = await _apiService.SignIn(model.Email, model.Password);

            if (isValid)
            {
                //await Navigation.PushAsync(new ItemsPage());
                await RootPage.NavigateFromMenu((int)MenuItemType.MyJobs);
            }
            else
            {
                await DisplayAlert("Error", error, "Ok");
            }
        }

        private void SetLabels()
        {
            Email.Text = Translator.Translate("Email");
            Password.Text = Translator.Translate("Password");
            SignInButton.Text = Translator.Translate("Sign-in");
        }
    }
}