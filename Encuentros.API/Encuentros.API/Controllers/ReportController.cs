using Encuentros.Reports;
using Encuentros.Reports.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Encuentros.API.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        [HttpPost("receipt")]
        public ActionResult Receipt()
        {
            var p = new PilatesReceipt
            {
                CustomerFullName = "Pepe Sanchez",
                PointOfSaleNumber = "00002",
                ReceiptNumber = "00000012",

                ReceiptConcepts = new List<ReceiptConcept>
                {
                    new ReceiptConcept
                    {
                        Amount = 500,
                        Description = "Pilates - Septiembre"
                    },
                    new ReceiptConcept
                    {
                        Amount = 500,
                        Description = "Pilates - Octubre"
                    },
                }
            };

            p.Create();

            return Ok();
        }

        [HttpPost("simpleTable")]
        public ActionResult SimpleTable()
        {
            var p = new SimpleTable();
            p.Main();

            return Ok();
        }

        [HttpPost("image")]
        public ActionResult Image()
        {
            var p = new ImageReport();
            p.Main();

            return Ok();
        }
    }
}