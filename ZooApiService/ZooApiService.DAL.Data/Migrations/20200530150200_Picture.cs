using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZooApiService.DAL.Data.Migrations
{
    public partial class Picture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeviceType",
                table: "SmartDevices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Animals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeviceType",
                table: "SmartDevices");

            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Animals");
        }
    }
}
