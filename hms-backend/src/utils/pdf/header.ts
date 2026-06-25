import PDFDocument from "pdfkit";

export const drawHospitalHeader = (doc: PDFDocument) => {
  // Background Header
  doc
    .roundedRect(40, 40, 515, 110, 8)
    .fill("#EFF6FF");

  // Left Logo Placeholder
  doc
    .circle(80, 95, 25)
    .fill("#2563EB");

  doc
    .fillColor("white")
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("H", 73, 86);

  // Hospital Name
  doc
    .fillColor("#1E3A8A")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(
      "SRI KAVYA KRISHNA HOSPITAL",
      130,
      55
    );

  doc
    .fillColor("#2563EB")
    .fontSize(15)
    .text(
      "SUPER SPECIALITY HOSPITAL",
      130,
      82
    );

  doc
    .fillColor("#555")
    .fontSize(10)
    .font("Helvetica")
    .text(
      "General Medicine • Cardiology • Orthopedics • Pediatrics",
      130,
      105
    );

  doc.text(
    "Bangalore | +91 9876543210 | info@hospital.com",
    130,
    122
  );

  // Blue Line
  doc
    .moveTo(40, 165)
    .lineTo(555, 165)
    .strokeColor("#2563EB")
    .lineWidth(2)
    .stroke();
};