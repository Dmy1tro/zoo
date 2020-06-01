using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.AdminViewModel;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = PolicyName.ForAdmins)]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AdminController(IAdminService adminService, IWebHostEnvironment webHostEnvironment)
        {
            _adminService = adminService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("backup")]
        public IActionResult Backup()
        {
            var path = Path.Combine(GetBackupPath(), "Backup.bak");

            if (!System.IO.File.Exists(path))
            {
                return BadRequest("No backups");
            }

            return PhysicalFile(path, "application/octet-stream", $"BackupFile{DateTime.UtcNow.ToShortDateString()}.bak");
        }

        [HttpPost("query")]
        public async Task<IActionResult> Query(QueryViewModel model)
        {
            var result = await _adminService.ExecuteQuery(model.SqlQuery);

            return Ok(result);
        }

        [HttpPost("command")]
        public async Task<IActionResult> Command(QueryViewModel model)
        {
            var result = await _adminService.ExecuteCommand(model.SqlQuery);

            return Ok(new { Result = result });
        }

        [HttpPost("create-backup")]
        public async Task<IActionResult> CreateBackup()
        {
            var path = GetBackupPath();

            await _adminService.CreateBackup(path);

            return NoContent();
        }

        private string GetBackupPath()
        {
            return Path.Combine(_webHostEnvironment.WebRootPath, "Backups");
        }
    }
}
