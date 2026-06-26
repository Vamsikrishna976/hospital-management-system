import PDFDocument from "pdfkit";

export const drawDoctorCard = (
  doc: any,
  doctor: any,
  reportStatus: string
) => {
  // ------------------------------
  // Section Title
  // ------------------------------

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("DOCTOR INFORMATION", 40, doc.y);

  doc.moveDown(0.4);

  const cardY = doc.y;

  // ------------------------------
  // Card
  // ------------------------------

  doc
    .roundedRect(40, cardY, 515, 115, 8)
    .fillAndStroke("#FFFFFF", "#D1D5DB");

  const top = cardY + 18;

  // ==============================
  // LEFT COLUMN
  // ==============================

  doc.fillColor("black").font("Helvetica-Bold").fontSize(11);

  doc.text("Doctor Code", 55, top);
  doc.text("Doctor Name", 55, top + 22);
  doc.text("Department", 55, top + 44);
  doc.text("Qualification", 55, top + 66);

  doc.font("Helvetica");

  doc.text(doctor.doctorCode ?? "-", 165, top);

  doc.text(doctor.fullName ?? "-", 165, top + 22);

  doc.text(doctor.specialization ?? "-", 165, top + 44);

  doc.text(doctor.qualification ?? "-", 165, top + 66);

  // ==============================
  // RIGHT COLUMN
  // ==============================

  doc.font("Helvetica-Bold");

  doc.text("Mobile", 330, top);
  doc.text("Email", 330, top + 22);
  doc.text("Consultation Fee", 330, top + 44);
  doc.text("Status", 330, top + 66);

  doc.font("Helvetica");

  doc.text(doctor.mobile ?? "-", 450, top);

  doc.text(doctor.email ?? "-", 450, top + 22, {
    width: 90,
  });

  doc.text(`₹${doctor.consultationFee ?? 0}`, 450, top + 44);

  // ==============================
  // STATUS BADGE
  // ==============================

  const badgeX = 445;
  const badgeY = top + 64;

  let badgeColor = "#DCFCE7";
  let textColor = "#15803D";

  if (reportStatus === "PENDING") {
    badgeColor = "#FEF3C7";
    textColor = "#B45309";
  }

  doc.roundedRect(badgeX, badgeY, 80, 22, 6).fill(badgeColor);

  doc
    .fillColor(textColor)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(reportStatus, badgeX + 10, badgeY + 7);

  doc.y = cardY + 122;
};