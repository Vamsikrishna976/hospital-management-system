import PDFDocument from "pdfkit";

export const drawBillingInfo = (
  doc: PDFDocument,
  bill: any,
  qrBuffer: Buffer
) => {

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#1E3A8A")
    .text("PHARMACY BILL", 40, doc.y, {
      align: "center",
      width: 515,
    });

  doc.moveDown(0.7);

  const y = doc.y;

  // Card Background
  doc
    .roundedRect(40, y, 515, 95, 8)
    .fillAndStroke("#F8FAFC", "#D1D5DB");

  doc.fillColor("black");

  // Left Column
  doc.font("Helvetica-Bold").fontSize(10);

  doc.text("Bill No", 55, y + 15);
  doc.text("Invoice No", 55, y + 35);
  doc.text("Generated", 55, y + 55);

  // Right Column
  doc.text("Payment", 260, y + 15);
  doc.text("Status", 260, y + 35);
  doc.text("Cashier", 260, y + 55);

  doc.font("Helvetica");

  doc.text(bill.billNumber, 130, y + 15);

  doc.text(
    bill.invoiceNumber ?? bill.billNumber,
    130,
    y + 35
  );

  doc.text(
    new Date(bill.createdAt).toLocaleString(),
    130,
    y + 55
  );

  doc.text(
    bill.paymentMethod ?? "Cash",
    340,
    y + 15
  );

  // Status Badge
  doc
    .roundedRect(335, y + 32, 75, 18, 4)
    .fill("#DCFCE7");

  doc
    .fillColor("#166534")
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      bill.status ?? "PAID",
      350,
      y + 37
    );

  doc
    .fillColor("black")
    .font("Helvetica")
    .fontSize(10)
    .text(
      bill.cashier ?? "Reception",
      340,
      y + 55
    );

  // QR Code
  doc.image(qrBuffer, 490, y + 18, {
    width: 50,
    height: 50,
  });

  doc
    .fontSize(7)
    .fillColor("#666666")
    .text(
      "Scan to Verify",
      485,
      y + 72,
      {
        width: 60,
        align: "center",
      }
    );

  doc.y = y + 115;
};