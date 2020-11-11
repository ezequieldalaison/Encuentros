using System;

namespace Encuentros.Logic.Extensions
{
    public static class DateTimeExtensions
    {
        public static int WeekdaysInMonth(int monthId, int year)
        {
            var quantityDaysInMonth = DateTime.DaysInMonth(year, monthId);

            var quantityWeekdays = 0;

            for (int i = 1; i <= quantityDaysInMonth; i++)
            {
                var date = new DateTime(year, monthId, i);

                if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
                    quantityWeekdays++;
            }

            return quantityWeekdays;
        }
    }
}