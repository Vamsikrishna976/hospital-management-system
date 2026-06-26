import PDFDocument from "pdfkit";

export const drawBillingSignature = (
  doc: PDFDocument,
  bill: any
) => {

  const sectionHeight = 135;

  // Move to new page if there isn't enough space
  if (doc.y + sectionHeight > doc.page.height - 80) {
    doc.addPage();
    doc.y = 50;
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("AUTHORIZATION", 40, doc.y);

  doc.moveDown(0.5);

  const y = doc.y;

  // Card
  doc
    .roundedRect(40, y, 515, 105, 8)
    .fillAndStroke("#FFFFFF", "#D1D5DB");

  //----------------------------------------
  // Signature Lines
  //----------------------------------------

  const lineY = y + 60;

  doc
    .strokeColor("#9CA3AF")
    .lineWidth(1);

  doc.moveTo(70, lineY).lineTo(170, lineY).stroke();

  doc.moveTo(250, lineY).lineTo(350, lineY).stroke();

  doc.moveTo(430, lineY).lineTo(530, lineY).stroke();

  //----------------------------------------
  // Labels
  //----------------------------------------

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#1E3A8A");

  doc.text("Pharmacist", 82, lineY + 8);

  doc.text("Cashier", 275, lineY + 8);

  doc.text("Authorized By", 440, lineY + 8);

  //----------------------------------------
  // Names
  //----------------------------------------

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("black");

  doc.text(
    bill.pharmacist ?? "Hospital Pharmacist",
    60,
    lineY + 24,
    {
      width: 120,
      align: "center",
    }
  );

  doc.text(
    bill.cashier ?? "Reception",
    240,
    lineY + 24,
    {
      width: 120,
      align: "center",
    }
  );

  doc.text(
    "Hospital Management",
    415,
    lineY + 24,
    {
      width: 120,
      align: "center",
    }
  );

  //----------------------------------------
  // Footer Note
  //----------------------------------------

  doc
    .fontSize(7)
    .fillColor("#6B7280")
    .text(
      "This bill is electronically generated and valid without a physical signature.",
      40,
      y + 88,
      {
        width: 515,
        align: "center",
      }
    );

  doc.y = y + sectionHeight;
}