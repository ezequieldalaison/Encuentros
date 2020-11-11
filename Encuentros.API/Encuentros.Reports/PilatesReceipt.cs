using Encuentros.Reports.Entities;
using iText.Html2pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Encuentros.Reports
{
    public class PilatesReceipt
    {
        public static readonly string BASEURI = @"C:\Encuentros\Encuentros.API\Encuentros.Reports\Templates\";
        public static readonly string SRC = @"C:\Encuentros\Encuentros.API\Encuentros.Reports\Templates\" + "PilatesReceipt.html";
        public static readonly string DEST = @"C:\Users\dalaison\Desktop\Reports\";

        public string PointOfSaleNumber { get; set; }
        public string ReceiptNumber { get; set; }
        public string CustomerFullName { get; set; }
        public List<ReceiptConcept> ReceiptConcepts { get; set; }
        public DateTime Date { get; set; }

        public FileStream Create()
        {
            string filePath = DEST + "Receipt_" + Date.ToString("yyyyMMddHHmmss") + ".pdf";
            ConverterProperties properties = new ConverterProperties();
            properties.SetBaseUri(BASEURI);

            var file = new FileStream(SRC, FileMode.Open);

            string fileContents;
            using (StreamReader reader = new StreamReader(file))
            {
                fileContents = reader.ReadToEnd();
            }

            fileContents = fileContents.Replace("{{fullReceiptNumber}}", PointOfSaleNumber + "-" + ReceiptNumber);
            fileContents = fileContents.Replace("{{date}}", Date.ToString("dd/MM/yyyy"));
            fileContents = fileContents.Replace("{{customerFullName}}", CustomerFullName);
            fileContents = fileContents.Replace("{{totalAmount}}", ReceiptConcepts.Sum(x => x.Amount).ToString());
            fileContents = fileContents.Replace("{{concepts}}", GetConceptsRows());

            HtmlConverter.ConvertToPdf(fileContents, new FileStream(filePath, FileMode.Create), properties);

            var finalFile = new FileStream(filePath, FileMode.Open);

            return finalFile;
        }

        private string GetConceptsRows()
        {
            var concepts = string.Empty;
            ReceiptConcepts.ForEach(x => concepts += CreateConceptRow(x));

            return concepts;
        }

        private string CreateConceptRow(ReceiptConcept receiptConcept)
        {
            return
                $@"<tr>
                    <td>
                        {receiptConcept.Description}
                    </td>
                    <td>
                        ${receiptConcept.Amount}
                    </td>
                </tr>";
        }
    }
}
