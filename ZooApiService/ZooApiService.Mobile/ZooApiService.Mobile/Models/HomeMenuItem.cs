using System;
using System.Collections.Generic;
using System.Text;

namespace ZooApiService.Mobile.Models
{
    public enum MenuItemType
    {
        SignIn = 0,
        MyJobs,
        Settings
    }
    public class HomeMenuItem
    {
        public MenuItemType Id { get; set; }

        public string Title { get; set; }

        public string Original { get; set; }
    }
}
