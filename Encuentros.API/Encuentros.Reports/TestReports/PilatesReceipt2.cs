using System;
using System.IO;
using iText.IO.Image;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;

namespace Encuentros.Reports
{
    public class PilatesReceipt2
    {
        public static readonly string DEST = @"C:\Users\dalaison\Desktop\Reports\";
        public static readonly string IMAGE = @"C:\Encuentros\Encuentros.API\Encuentros.Reports\Images\logo_blanco.jpg";

        public void Main()
        {
            var destination = DEST + "Receipt_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".pdf";
            FileInfo file = new FileInfo(destination);
            file.Directory.Create();

            new PilatesReceipt2().ManipulatePdf(destination);
        }

        protected void ManipulatePdf(String dest)
        {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(dest));
            PageSize pageSize = PageSize.A4;
            Document doc = new Document(pdfDoc, pageSize);

            PdfCanvas canvas = new PdfCanvas(pdfDoc.AddNewPage());
            var re = new Rectangle(pageSize.GetLeft() + 50, pageSize.GetTop() - 125, 200, 125);
            SolidLine solidLine = new SolidLine();
            solidLine.Draw(canvas, re);
            canvas.Rectangle(re);
            canvas.AddImageFittedIntoRectangle(ImageDataFactory.Create(IMAGE), re, true);

            doc.Close();
        }
    }
}