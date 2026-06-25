import PDFDocument from "pdfkit";

export const drawSignatures = (
  doc: PDFDocument,
  doctor: any
) => {

  // Add a new page if there's not enough space
  if (doc.y > 650) {
    doc.addPage();
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("AUTHORIZATION", 40, doc.y);

  doc.moveDown();

  const y = doc.y;

  doc
    .roundedRect(40, y, 515, 150, 8)
    .fillAndStroke("#FFFFFF", "#D1D5DB");

  // -------------------------
  // Signature Lines
  // -------------------------

  const startY = y + 90;

  // Lab Technician
  doc
    .moveTo(70, startY)
    .lineTo(180, startY)
    .strokeColor("#999")
    .stroke();

  // Pathologist
  doc
    .moveTo(235, startY)
    .lineTo(345, startY)
    .stroke();

  // Doctor
  doc
    .moveTo(400, startY)
    .lineTo(510, startY)
    .stroke();

  // Titles

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#1E3A8A");

  doc.text("Lab Technician", 75, startY + 8);

  doc.text("Pathologist", 245, startY + 8);

  doc.text("Consulting Doctor", 390, startY + 8);

  // Names

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("black");

  doc.text("Ramesh Kumar", 70, startY + 24);

  doc.text("Dr. Sneha Rao", 235, startY + 24);

  doc.text(doctor.fullName, 400, startY + 24);

  // IDs

  doc
    .fontSize(8)
    .fillColor("gray");

  doc.text("Employee ID : LT-102", 70, startY + 40);

  doc.text("Reg No : PATH-4582", 235, startY + 40);

  doc.text(
    `Doctor Code : ${doctor.doctorCode}`,
    400,
    startY + 40
  );

  doc.y = y + 170;
};