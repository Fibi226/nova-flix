using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;

namespace NovaFlix.Infrastructure.Helper
{
    public class ImageHelper (IWebHostEnvironment environment)
    {
        private readonly IWebHostEnvironment _environment = environment;

        public async Task<string> SaveFile(IFormFile file)
        {
            if (file == null)
            {
                throw new ArgumentException(nameof(file));
            }

            var contentPath = _environment.ContentRootPath;
            var uploadsPath = Path.Combine(contentPath, "Uploads");

            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            var decomposedFileName = file.FileName.Split(".");
            var ext = decomposedFileName[^1];
            var fileName = $"{Guid.NewGuid().ToString()}.{ext}";
            var filePath = Path.Combine(uploadsPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
