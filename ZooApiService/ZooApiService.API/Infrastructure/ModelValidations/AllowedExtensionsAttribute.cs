using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace ZooApiService.API.Infrastructure.ModelValidations
{
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly IEnumerable<string> _extensions;

        public AllowedExtensionsAttribute(string[] extensions)
        {
            _extensions = extensions;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (!(value is IFormFile file))
            {
                return new ValidationResult("This is not a file");
            }

            var extension = Path.GetExtension(file.FileName);

            return _extensions.Any(x => x.Equals(extension, StringComparison.InvariantCultureIgnoreCase))
                ? ValidationResult.Success
                : new ValidationResult($"File extension '{extension}' not allowed.");
        }
    }
}
