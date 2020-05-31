using ZooApiService.Mobile.Models;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using Xamarin.Forms;
using ZooApiService.Mobile.Helper;

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
                var items = MenuItems.Where(x => x.Id != MenuItemType.SignIn).ToList();
                items.Add(new HomeMenuItem
                {
                    Id = MenuItemType.MyJobs,
                    Title = Translator.Translate("My-jobs"),
                    Original = "My-jobs"
                });

                MenuItems.Clear();

                items.OrderBy(x => x.Id).ToList().ForEach(x => MenuItems.Add(x));
            });

            MessagingCenter.Subscribe<Settings>(this, "l", (sender) =>
            {
                MenuItems.Clear();

                var items = GetMenuItems().ToList();

                if (LocalStorage.GetItem("token") != null)
                {
                    items = items.Where(x => x.Id != MenuItemType.SignIn).ToList();

                    items.Add(new HomeMenuItem
                    {
                        Id = MenuItemType.MyJobs,
                        Title = Translator.Translate("My-jobs"),
                        Original = "My-jobs"
                    });
                }

                items.OrderBy(x => x.Id).ToList().ForEach(x => MenuItems.Add(x));
            });
        }

        private void Initialize()
        {
            MenuItems = GetMenuItems();

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

        private ObservableCollection<HomeMenuItem> GetMenuItems() =>
            new ObservableCollection<HomeMenuItem>
            {
                new HomeMenuItem
                    {Id = MenuItemType.SignIn, Title = Translator.Translate("Sign-in"), Original = "Sign-in"},
                new HomeMenuItem
                    {Id = MenuItemType.Settings, Title = Translator.Translate("Settings"), Original = "Settings"}
            };
    }
}