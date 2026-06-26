import PDFDocument from "pdfkit";

export const drawSignatures = (doc: any, doctor: any) => {
  // New Page if needed
  const sectionHeight = 130;

  if (doc.y + sectionHeight > 730) {
    doc.addPage();
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("AUTHORIZATION", 40, doc.y);

  doc.moveDown(0.6);

  const y = doc.y;

  doc.roundedRect(40, y, 515, 105, 8).fillAndStroke("#FFFFFF", "#D1D5DB");

  //---------------------------------------
  // Signature Lines
  //---------------------------------------

  const lineY = y + 60;

  doc.strokeColor("#808080").lineWidth(1);

  doc.moveTo(70, lineY).lineTo(150, lineY).stroke();

  doc.moveTo(235, lineY).lineTo(315, lineY).stroke();

  doc.moveTo(400, lineY).lineTo(480, lineY).stroke();

  //---------------------------------------
  // Labels
  //---------------------------------------

  doc.font("Helvetica-Bold").fontSize(9).fillColor("#1E3A8A");

  doc.text("Lab Technician", 68, lineY + 8);

  doc.text("Pathologist", 238, lineY + 8);

  doc.text("Consulting Doctor", 395, lineY + 8);

  //---------------------------------------
  // Names
  //---------------------------------------

  doc.font("Helvetica").fontSize(8).fillColor("black");

  doc.text("Ramesh Kumar", 62, lineY + 24);

  doc.text("Dr. Sneha Rao", 228, lineY + 24);

  doc.text(doctor.fullName, 390, lineY + 24);

  //---------------------------------------
  // IDs
  //---------------------------------------

  doc.fontSize(6).fillColor("gray");

  doc.text("Employee ID : LT-102", 60, lineY + 36);

  doc.text("Reg No : PATH-4582", 225, lineY + 36);

  doc.text(`Doctor Code : ${doctor.doctorCode}`, 388, lineY + 36);

  doc.y = y + 120;
};
