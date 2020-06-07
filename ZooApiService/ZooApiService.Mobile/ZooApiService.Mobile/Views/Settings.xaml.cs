using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using ZooApiService.Mobile.Helper;

namespace ZooApiService.Mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Settings : ContentPage
    {
        public Settings()
        {
            InitializeComponent();

            CurrentLang.Text = LocalStorage.GetItem("localization");
        }

        public void ChangeLang(object sender, EventArgs eventArgs)
        {
            var current = LocalStorage.GetItem("localization");

            if (current == "en")
            {
                Translator.ChangeLocale("ua");
                CurrentLang.Text = "ua";
            }
            else
            {
                Translator.ChangeLocale("en");
                CurrentLang.Text = "en";
            }

            MessagingCenter.Send(this, "l");
        }
    }
}