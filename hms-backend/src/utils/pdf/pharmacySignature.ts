import PDFDocument from "pdfkit";

export const drawPharmacySignature = (
  doc: any,
  bill: any
) => {

  if (doc.y + 130 > doc.page.height - 90) {
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

  doc
    .roundedRect(40, y, 515, 100, 8)
    .fillAndStroke("#FFFFFF", "#D1D5DB");

  const lineY = y + 55;

  doc
    .strokeColor("#888")
    .lineWidth(1);

  doc.moveTo(80, lineY).lineTo(190, lineY).stroke();

  doc.moveTo(365, lineY).lineTo(475, lineY).stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#1E3A8A");

  doc.text("Pharmacist", 95, lineY + 8);

  doc.text("Cashier", 395, lineY + 8);

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("black");

  doc.text(
    bill.pharmacist ?? "Hospital Pharmacist",
    75,
    lineY + 24
  );

  doc.text(
    bill.cashier ?? "Cash Counter",
    375,
    lineY + 24
  );

  doc.y = y + 120;
};