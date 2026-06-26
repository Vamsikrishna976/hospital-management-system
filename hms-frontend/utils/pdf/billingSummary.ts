import PDFDocument from "pdfkit";

export const drawBillingSummary = (
  doc: PDFDocument,
  bill: any
) => {

  // Check if enough space remains
  if (doc.y + 170 > doc.page.height - 100) {
    doc.addPage();
    doc.y = 50;
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("PAYMENT SUMMARY", 40, doc.y);

  doc.moveDown(0.5);

  const y = doc.y;

  // Summary Card
  doc
    .roundedRect(280, y, 275, 155, 8)
    .fillAndStroke("#F8FAFC", "#D1D5DB");

  const labelX = 300;
  const valueX = 520;

  const rows = [
    {
      label: "Subtotal",
      value: bill.subtotal ?? bill.totalAmount,
    },
    {
      label: "GST",
      value: bill.gstAmount ?? 0,
    },
    {
      label: "Discount",
      value: bill.discount ?? 0,
    },
    {
      label: "Paid Amount",
      value: bill.paidAmount ?? bill.totalAmount,
    },
    {
      label: "Due Amount",
      value: bill.dueAmount ?? 0,
    },
  ];

  let currentY = y + 18;

  rows.forEach((row) => {

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("black")
      .text(row.label, labelX, currentY);

    doc.text(
      `₹${Number(row.value).toFixed(2)}`,
      valueX,
      currentY,
      {
        width: 25,
        align: "right",
      }
    );

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

  doc.text(
    `₹${Number(bill.totalAmount).toFixed(2)}`,
    valueX,
    currentY,
    {
      width: 25,
      align: "right",
    }
  );

  // Payment Badge

  const badgeY = y + 120;

  let badgeColor = "#DCFCE7";
  let textColor = "#166534";
  let status = bill.status ?? "PAID";

  if (status === "PENDING") {
    badgeColor = "#FEE2E2";
    textColor = "#B91C1C";
  }

  if (status === "PARTIAL") {
    badgeColor = "#FEF3C7";
    textColor = "#92400E";
  }

  doc
    .roundedRect(55, badgeY, 140, 30, 6)
    .fill(badgeColor);

  doc
    .fillColor(textColor)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(
      status,
      55,
      badgeY + 9,
      {
        width: 140,
        align: "center",
      }
    );

  doc.y = y + 175;
};