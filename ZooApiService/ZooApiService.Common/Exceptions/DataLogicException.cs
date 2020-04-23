using System;
using System.Collections.Generic;
using System.Text;

namespace ZooApiService.Common.Exceptions
{
    public class DataLogicException : Exception
    {
        public DataLogicException(string message)
            : base(message)
        {
        }
    }
}
