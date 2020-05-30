using ZooApiService.Mobile.Models;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using Xamarin.Forms;

namespace ZooApiService.Mobile.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MenuPage : ContentPage
    {
        MainPage RootPage { get => Application.Current.MainPage as MainPage; }
        public ObservableCollection<HomeMenuItem> MenuItems { get; set; }
        public MenuPage()
        {
            InitializeComponent();

            Subscribe();

            Initialize();
        }

        private void Subscribe()
        {
            MessagingCenter.Subscribe<LoginPage>(this, "SignIn", (sender) =>
            {
                var menu = MenuItems.First(x => x.Id == MenuItemType.SignIn);
                MenuItems.Remove(menu);

                MenuItems.Add(new HomeMenuItem
                {
                    Id = MenuItemType.MyJobs,
                    Title = "My Jobs"
                });
            });
        }

        private void Initialize()
        {
            MenuItems = new ObservableCollection<HomeMenuItem>
            {
                new HomeMenuItem {Id = MenuItemType.SignIn, Title="Sign in" },
                new HomeMenuItem { Id = MenuItemType.Settings, Title = "Settings" }
            };

            ListViewMenu.ItemsSource = MenuItems;

            ListViewMenu.SelectedItem = MenuItems[0];
            ListViewMenu.ItemSelected += async (sender, e) =>
            {
                if (e.SelectedItem == null)
                    return;

                var id = (int)((HomeMenuItem)e.SelectedItem).Id;
                await RootPage.NavigateFromMenu(id);
            };
        }
    }
}