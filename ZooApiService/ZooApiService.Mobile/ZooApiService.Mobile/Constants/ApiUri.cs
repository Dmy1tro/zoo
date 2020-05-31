namespace ZooApiService.Mobile.Constants
{
    public static class ApiUri
    {
        public const string RootUrl = "http://10.0.2.2:5000/api/";

        public const string SignIn = RootUrl + "account/sign-in";

        public const string Jobs = RootUrl + "jobs/";

        public const string MyJobs = Jobs + "my-jobs/";

        public const string StartJob = Jobs + "start-job/";

        public const string FinishJob = Jobs + "finish-job/";
    }
}
