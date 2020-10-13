namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalWorkedHoursDto
    {
        public long QuantityHours { get; set; }
        /// <summary>
        /// Indicates if all days in the month are closed
        /// </summary>
        public bool IsMonthClosed { get; set; }
    }
}