import PDFDocument from "pdfkit";

export const drawReportInfo = (
  doc: any,
  report: any,
  qrBuffer: Buffer,
) => {
  const y = doc.y;

  // Card
  doc.roundedRect(40, y, 515, 90, 8).fillAndStroke("#F8FAFC", "#D1D5DB");

  doc.fillColor("#1E3A8A");

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("REPORT INFORMATION", 55, y + 12);

  // Status Badge
  doc.roundedRect(420, y + 10, 110, 22, 6).fill("#DCFCE7");

  doc
    .fillColor("#15803D")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(report.status, 445, y + 17);

  doc.fillColor("black");

  doc.font("Helvetica").fontSize(11);

  doc.text(
    `Report No : LAB-${report.id.substring(0, 8).toUpperCase()}`,
    55,
    y + 40,
  );

  doc.text(
    `Order No : ${report.id.substring(0, 12).toUpperCase()}`,
    55,
    y + 58,
  );

  doc.text(`Generated : ${new Date().toLocaleString()}`, 290, y + 40);

  doc.text(
    `Completed : ${
      report.items[0]?.completedAt
        ? new Date(report.items[0].completedAt).toLocaleString()
        : "-"
    }`,
    290,
    y + 58,
  );

  // ==========================================
  // QR Code
  // ==========================================

  doc.image(qrBuffer, 495, y + 32, {
    width: 48,
    height: 48,
  });

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor("#666666")
    .text("Scan to Verify", 488, y + 83, {
      width: 60,
      align: "center",
    });

  doc.y = y + 110;
};
