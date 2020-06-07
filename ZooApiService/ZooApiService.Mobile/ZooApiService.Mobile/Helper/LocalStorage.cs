using System.Collections.Concurrent;

namespace ZooApiService.Mobile.Helper
{
    public static class LocalStorage
    {
        private static readonly ConcurrentDictionary<string, string> _items;

        static LocalStorage()
        {
            _items = new ConcurrentDictionary<string, string>();
        }

        public static void SetItem(string name, string val)
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
