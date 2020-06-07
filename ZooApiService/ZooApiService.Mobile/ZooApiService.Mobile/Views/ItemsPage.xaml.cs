using System;
using System.ComponentModel;
using Xamarin.Forms;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Models.BLL;
using ZooApiService.Mobile.ViewModels;

namespace ZooApiService.Mobile.Views
{
    [DesignTimeVisible(false)]
    public partial class ItemsPage : ContentPage
    {
        ItemsViewModel viewModel;

        public ItemsPage()
        {
            InitializeComponent();
            
            BindingContext = viewModel = new ItemsViewModel();

            MessagingCenter.Subscribe<Settings>(this, "l", (sender) =>
                {
                    BrowseItemsPage.Title = Translator.Translate("My-jobs");
                });
        }

        async void OnItemSelected(object sender, EventArgs args)
        {
            var layout = (BindableObject)sender;
            var job = (Job)layout.BindingContext;
            await Navigation.PushAsync(new ItemDetailPage(new ItemDetailViewModel(job)));
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (viewModel.Jobs.Count == 0)
                viewModel.IsBusy = true;
        }
    }
}