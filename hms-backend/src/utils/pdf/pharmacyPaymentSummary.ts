import PDFDocument from "pdfkit";

export const drawPharmacyPaymentSummary = (doc: any, bill: any) => {
  // Add a new page if needed
  if (doc.y + 180 > doc.page.height - 100) {
    doc.addPage();
    doc.y = 50;
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#1E40AF")
    .text("PAYMENT SUMMARY", 40, doc.y);

  doc.moveDown(1);

  const y = doc.y;

  // Summary Card
  doc.roundedRect(250, y, 305, 175, 8).fillAndStroke("#F8FAFC", "#D1D5DB");

  const labelX = 285;
  const valueX = 430;
  const valueWidth = 105;
  const rows = [
    {
      label: "Subtotal",
      value: bill.subtotal,
    },
    {
      label: "GST",
      value: bill.gstAmount,
    },
    {
      label: "Discount",
      value: bill.discount,
    },
    {
      label: "Paid Amount",
      value: bill.paidAmount,
    },
    {
      label: "Due Amount",
      value: bill.dueAmount,
    },
  ];

  let currentY = y + 18;

  rows.forEach((row) => {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("black")
      .text(row.label, labelX, currentY);

    doc.text(`₹${Number(row.value).toFixed(2)}`, valueX, currentY, {
      width: valueWidth,
      align: "right",
    });

    currentY += 22;
  });

  // Divider
  doc
    .moveTo(labelX, currentY)
    .lineTo(540, currentY)
    .strokeColor("#D1D5DB")
    .stroke();

  currentY += 15;

  // Grand Total
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#16A34A")
    .text("GRAND TOTAL", labelX, currentY);

  doc.text("₹"+`${Number(bill.totalAmount).toFixed(2)}`, valueX, currentY, {
    width: valueWidth,
    align: "right",
    lineBreak: false,
  });

  // Payment Status Badge
  const badgeY = y + 125;

  let badgeColor = "#DCFCE7";
  let textColor = "#166534";

  if (bill.paymentStatus === "PENDING") {
    badgeColor = "#FEE2E2";
    textColor = "#B91C1C";
  }

  if (bill.paymentStatus === "PARTIAL") {
    badgeColor = "#FEF3C7";
    textColor = "#92400E";
  }

  doc.roundedRect(55, badgeY, 150, 32, 6).fill(badgeColor);

  doc
    .fillColor(textColor)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(bill.paymentStatus, 55, badgeY + 10, {
      width: 150,
      align: "center",
    });

  doc.y = y + 185;
};
