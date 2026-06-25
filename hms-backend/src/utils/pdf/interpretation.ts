import PDFDocument from "pdfkit";

export const drawInterpretation = (
  doc: PDFDocument,
  items: any[]
) => {

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("INTERPRETATION", 40, doc.y);

  doc.moveDown(0.5);

  const y = doc.y;

  doc
    .roundedRect(40, y, 515, 100, 8)
    .fillAndStroke("#F8FAFC", "#D1D5DB");

  doc.fillColor("black");

  doc.font("Helvetica");

  doc.fontSize(11);

  let comments = [];

  for (const item of items) {

    if (!item.remarks) continue;

    comments.push(`• ${item.labTest.testName}: ${item.remarks}`);
  }

  if (comments.length === 0) {

    comments.push("• All laboratory parameters are within normal limits.");

    comments.push("• Clinical correlation is advised.");

  }

  doc.text(
    comments.join("\n\n"),
    55,
    y + 18,
    {
      width: 480,
      align: "left"
    }
  );

  doc.y = y + 120;
};