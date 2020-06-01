using System;
using System.ComponentModel;
using Xamarin.Forms;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Services;
using static ZooApiService.Mobile.Models.BLL.Enums;
using ZooApiService.Mobile.ViewModels;

namespace ZooApiService.Mobile.Views
{
    [DesignTimeVisible(false)]
    public partial class ItemDetailPage : ContentPage
    {
        ItemDetailViewModel viewModel;
        private readonly ApiService _apiService;

        public ItemDetailPage(ItemDetailViewModel viewModel)
        {
            InitializeComponent();
            _apiService = new ApiService();
            BindingContext = this.viewModel = viewModel;
            button.BackgroundColor = Color.LightBlue;

            try
            {
                SetLabels();
                Refresh();
            }
            catch(Exception ex)
            {

            }

            MessagingCenter.Subscribe<Settings>(this, "l", s =>
            {
                try
                {
                    SetLabels();
                }
                catch (Exception e)
                {

                }
            });
        }

        public async void OnButtonClick(object sender, EventArgs args)
        {
            if (!viewModel.IsEnabled)
            {
                return;
            }

            switch (viewModel.Job.Status)
            {
                case JobStatus.Created:
                {
                    await _apiService.StartJob(viewModel.Job.JobId);
                    break;
                }

                case JobStatus.InProgress:
                {
                    await _apiService.FinishJob(viewModel.Job.JobId);
                        break;
                }
            }

            var updatedJob = await _apiService.GetJob(viewModel.Job.JobId);

            viewModel.Job.Status = updatedJob.Status;
            viewModel.Job.StartDate = updatedJob.StartDate;
            viewModel.Job.FinishDate = updatedJob.FinishDate;
            viewModel.ButtonText = viewModel.GetButtonText();
            viewModel.IsEnabled = updatedJob.Status != JobStatus.Finished;

            try
            {
                Refresh();
            }
            catch (Exception ex)
            {

            }
        }

        private void Refresh()
        {
            var job = viewModel.Job;

            l_title.Text = job.Title;
            l_description.Text = job.Description;
            l_crDate.Text = job.CreationDate;
            try
            {
                l_sDate.Text = string.IsNullOrEmpty(job.StartDate)
                    ? Translator.Translate("Not-started")
                    : DateTime.Parse(job.StartDate).ToString();
                l_fDate.Text = string.IsNullOrEmpty(job.FinishDate)
                    ? Translator.Translate("Not-finished")
                    : DateTime.Parse(job.FinishDate).ToString();
            }
            catch (Exception ex)
            {

            }
            l_status.Text = Translator.Translate(GetStringStatus(job.Status));
            button.Text = Translator.Translate(viewModel.ButtonText);
            button.IsEnabled = job.Status != JobStatus.Finished;
        }

        private void SetLabels()
        {
            Title.Text = Translator.Translate("Title");
            Description.Text = Translator.Translate("Description");
            Status.Text = Translator.Translate("Status");
            CreatDate.Text = Translator.Translate("Creation-date");
            FinishDate.Text = Translator.Translate("Finish-date");
            StartDate.Text = Translator.Translate("Start-date");
            button.Text = Translator.Translate(viewModel.ButtonText);
        }

        private string GetStringStatus(JobStatus status)
        {
            switch (status)
            {
                case JobStatus.Created:
                    return "Created";

                case JobStatus.InProgress:
                    return "In-progress";

                case JobStatus.Finished:
                    return "Finished";

                default:
                    return "";
            }
        }
    }
}