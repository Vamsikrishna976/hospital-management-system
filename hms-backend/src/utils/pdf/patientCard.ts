import PDFDocument from "pdfkit";

export const drawPatientCard = (
  doc: any,
  patient: any
) => {
  const y = doc.y;

  // Title
doc
  .font("Helvetica-Bold")
  .fontSize(14)
  .fillColor("#1E3A8A")
  .text("PATIENT INFORMATION", 40, doc.y);

doc.moveDown(0.4);


// Card
const cardY = doc.y;
  doc
    .roundedRect(40, doc.y, 515, 110, 8)
    .fillAndStroke("#FFFFFF", "#D1D5DB");

  const top = doc.y + 18;

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("black");

  // Left Column
  doc.text(`Patient ID`, 55, top);
  doc.text(`${patient.patientNumber}`, 150, top);

  doc.text(`Patient Name`, 55, top + 20);
  doc.text(`${patient.fullName}`, 150, top + 20);

  doc.text(`Mobile`, 55, top + 40);
  doc.text(`${patient.mobile}`, 150, top + 40);

  doc.text(`Address`, 55, top + 60);
  doc.text(`${patient.address ?? "-"}`, 150, top + 60, {
    width: 130,
  });

  // Right Column
  doc.text(`Age`, 320, top);
  doc.text(`${patient.age} Years`, 390, top);

  doc.text(`Gender`, 320, top + 20);
  doc.text(`${patient.gender}`, 390, top + 20);

  doc.text(`Blood Group`, 320, top + 40);
  doc.text(`${patient.bloodGroup ?? "-"}`, 390, top + 40);

  doc.text(`Email`, 320, top + 60);
  doc.text(`${patient.email ?? "-"}`, 390, top + 60, {
    width: 120,
  });

  doc.y += 25;
};