import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const drawHospitalHeader = (doc: any) => {
  // Background
  doc.roundedRect(40, 40, 515, 120, 8).fill("#EFF6FF");

  // -------------------------
  // Hospital Logo
  // -------------------------

  const logoPath = path.join(process.cwd(), "assets", "logo.png");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 55, 64, {
      width: 90,
      height: 35,
    });
  } else {
    // Fallback if logo doesn't exist
    doc.circle(82, 86, 28).fill("#2563EB");

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(24)
      .text("H", 74, 74);
  }

  // -------------------------
  // Hospital Name
  // -------------------------

  doc
    .fillColor("#1E3A8A")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text("CITY CARE HOSPITAL", 145, 52);

  doc
    .fillColor("#2563EB")
    .fontSize(15)
    .text("SUPER SPECIALITY HOSPITAL", 145, 80);

  doc
    .fillColor("#555555")
    .font("Helvetica")
    .fontSize(10)
    .text("General Medicine • Cardiology • Orthopedics • Pediatrics", 145, 103);

  doc.text("Bangalore | +91 9876543210 | info@hospital.com", 145, 120);

  doc
    .fontSize(8)
    .fillColor("#6B7280")
    .text(
      "NABH Accredited • ISO 9001:2015 Certified • 24×7 Emergency",
      145,
      138,
    );

  // -------------------------
  // Divider
  // -------------------------

  doc
    .moveTo(40, 165)
    .lineTo(555, 165)
    .strokeColor("#2563EB")
    .lineWidth(2)
    .stroke();

  // Reset cursor
  doc.x = 40;
  doc.y = 180;
};
