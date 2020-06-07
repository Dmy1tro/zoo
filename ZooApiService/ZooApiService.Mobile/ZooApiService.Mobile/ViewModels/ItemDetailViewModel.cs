using ZooApiService.Mobile.Models.BLL;
using static ZooApiService.Mobile.Models.BLL.Enums;

namespace ZooApiService.Mobile.ViewModels
{
    public class ItemDetailViewModel : BaseViewModel
    {
        public Job Job { get; set; }

        public string ButtonText { get; set; }

        public bool IsEnabled { get; set; }

        public ItemDetailViewModel(Job job)
        {
            Title = job.Title;
            Job = job;
            IsEnabled = Job.Status != JobStatus.Finished;
            ButtonText = GetButtonText();
        }

        public string GetButtonText()
        {
            switch (Job.Status)
            {
                case JobStatus.Created:
                    return "Start";

                case JobStatus.InProgress:
                    return "Finish";

                case JobStatus.Finished:
                    return "Finished";

                default: 
                    return "Unknown";
            }
        }
    }
}
