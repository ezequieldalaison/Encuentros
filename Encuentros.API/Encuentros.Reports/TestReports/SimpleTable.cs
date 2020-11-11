using System;
using System.IO;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace Encuentros.Reports
{
    public class SimpleTable
    {
        public static readonly string DEST = @"C:\Users\dalaison\Desktop\Reports\";

        public void Main()
        {
            var destination = DEST + "SimpleTable_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".pdf";
            FileInfo file = new FileInfo(destination);
            file.Directory.Create();

            new SimpleTable().ManipulatePdf(destination);
        }

        private void ManipulatePdf(String dest)
        {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(dest));
            Document doc = new Document(pdfDoc);

            Table table = new Table(UnitValue.CreatePercentArray(8)).UseAllAvailableWidth();

            for (int i = 0; i < 16; i++)
            {
                table.AddCell("hi");
            }

            doc.Add(table);

            doc.Close();
        }
    }
}
