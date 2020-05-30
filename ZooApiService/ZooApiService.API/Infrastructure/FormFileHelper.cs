using System.IO;
using Microsoft.AspNetCore.Http;

namespace ZooApiService.API.Infrastructure
{
    public static class FormFileHelper
    {
        public static byte[] ConvertFileToBytes(IFormFile file)
        {
            if (file is null)
            {
                return null;
            }

            using var ms = new MemoryStream();

            file.CopyTo(ms);

            return ms.ToArray();
        }
    }
}
