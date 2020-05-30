using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;

using Xamarin.Forms;

using ZooApiService.Mobile.Models;
using ZooApiService.Mobile.Models.BLL;
using ZooApiService.Mobile.Services;
using ZooApiService.Mobile.Views;

namespace ZooApiService.Mobile.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        private readonly ApiService _apiService;
        public ObservableCollection<Job> Jobs { get; set; }
        public Command LoadItemsCommand { get; set; }

        public ItemsViewModel()
        {
            _apiService = new ApiService();
            Title = "Browse";
            Jobs = new ObservableCollection<Job>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());

            //MessagingCenter.Subscribe<NewItemPage, Item>(this, "AddItem", async (obj, item) =>
            //{
            //    var newItem = item as Item;
            //    Jobs.Add(newItem);
            //    await DataStore.AddItemAsync(newItem);
            //});
        }

        async Task ExecuteLoadItemsCommand()
        {
            IsBusy = true;

            try
            {
                Jobs.Clear();

                var loadedJobs = await _apiService.GetJobs();

                loadedJobs.ForEach(x => Jobs.Add(x));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}