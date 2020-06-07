using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ZooApiService.Mobile.Helper
{
    [ContentProperty("Text")]
    public class Translator : IMarkupExtension
    {
        public string Text { get; set; }

        public static void ChangeLocale(string loc)
        {
            LocalStorage.SetItem("localization", loc);
        }

        public object ProvideValue(IServiceProvider serviceProvider)
        {
            if (Text is null)
            {
                return null;
            }

            var loc = LocalStorage.GetItem("localization");

            if (loc is null)
            {
                ChangeLocale("en");
                loc = "en";
            }

            return loc == "en"
                ? _wordsEn[Text]
                : _wordsUa[Text];
        }

        public static string Translate(string word)
        {
            var loc = LocalStorage.GetItem("localization");

            if (loc is null)
            {
                ChangeLocale("en");
                loc = "en";
            }

            return loc == "en"
                ? _wordsEn[word]
                : _wordsUa[word];
        }

        private static Dictionary<string, string> _wordsEn = new Dictionary<string, string>
        {
            { "Email", "Email"},
            { "Password", "Password"},
            { "Sign-in", "Sign in"},
            { "Job", "Job" },
            { "Status", "Status"},
            { "Creation-date", "Creation date"},
            { "Start-date", "Start date"},
            { "Finish-date", "Finish date"},
            { "Create-job", "Create job"},
            {"Update-job", "Update job"},
            {"Responsible", "Responsible"},
            {"Not-started", "Not started"},
            {"Not-finished", "Not finished"},
            {"Start", "Start"},
            {"Finish", "Finish"},
            {"Finished", "Finished"},
            { "My-jobs", "My jobs"},
            {"Title", "Title" },
            {"Description", "Description" },
            { "Settings", "Settings" },
            { "Created", "Створено" },
            { "In-progress", "In progress" }
        };

        private static Dictionary<string, string> _wordsUa = new Dictionary<string, string>
        {
            { "Email", "Електронна пошта"},
            { "Password", "Пароль"},
            { "Sign-in", "Увійти"},
            { "Job", "Завдання"},
            {"Status", "Статус"},
            {"Creation-date", "Дата створення"},
            { "Start-date", "Дата початку"},
            { "Finish-date", "Дата закінчення"},
            {"Create-job", "Створити завдання"},
            {"Update-job", "Редагувати завдання"},
            {"Responsible", "Відповідальний"},
            {"Not-started", "Не почато"},
            {"Not-finished", "Не закінчено"},
            {"Start", "Почати"},
            {"Finish", "Закінчити"},
            {"Finished", "Закінчено"},
            { "My-jobs", "Мої завдання"},
            {"Title", "Назва" },
            {"Description", "Опис" },
            { "Settings", "Налаштування" },
            { "Created", "Створено" },
            { "In-progress", "В процесі" }
        };
    }
}
