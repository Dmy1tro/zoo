﻿using System;
using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.EmployeeViewModels
{
    public class EmployeeViewModel
    {
        public string Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
