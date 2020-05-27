using System.Collections.Generic;

namespace ZooApiService.Mobile.Helper
{
    public static class LocalStorage
    {
        private static readonly Dictionary<string, string> _items;

        static LocalStorage()
        {
            _items = new Dictionary<string, string>();
        }

        public static void AddItem(string name, string val)
        {
            _items[name] = val;
        }

        public static string GetItem(string name)
        {
            return _items.ContainsKey(name) 
                ? _items[name] 
                : null;
        }
    }
}
