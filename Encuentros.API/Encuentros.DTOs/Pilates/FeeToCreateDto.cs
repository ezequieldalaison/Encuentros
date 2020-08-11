using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.DTOs.Pilates
{
    public class FeeToCreateDto
    {
        public long StudentId { get; set; }
        public long MonthId { get; set; }
        public long FeeTypeId { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
    }
}