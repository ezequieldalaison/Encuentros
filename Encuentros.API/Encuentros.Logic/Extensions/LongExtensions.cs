using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.Logic.Extensions
{
    public static class LongExtensions
    {
        public static string ToReceiptNumber(this long number)
        {
            return number.ToString("00000000");
        }
    }
}