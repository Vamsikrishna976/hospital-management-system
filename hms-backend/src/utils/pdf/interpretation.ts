import PDFDocument from "pdfkit";

export const drawInterpretation = (doc: any, items: any[]) => {
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("INTERPRETATION", 40, doc.y);

  doc.moveDown(0.5);

  const comments: string[] = [];

  items.forEach((item) => {
    const testName = item.labTest.testName;
    const remark = (item.remarks || "").toLowerCase();

    if (remark.includes("high")) {
      comments.push(
        `• ${testName} is above the normal reference range. Clinical correlation is advised.`,
      );
    } else if (remark.includes("low")) {
      comments.push(
        `• ${testName} is below the normal reference range. Clinical correlation is advised.`,
      );
    } else if (remark.includes("critical")) {
      comments.push(
        `• ${testName} shows critical findings and requires immediate medical attention.`,
      );
    } else if (remark) {
      comments.push(
        `• ${testName} is within the normal reference range (${item.remarks}).`,
      );
    }
  });

  if (comments.length === 0) {
    comments.push(
      "• All laboratory parameters are within the normal reference range.",
    );
    comments.push("• No clinically significant abnormalities were detected.");
    comments.push("• Correlate clinically if symptoms persist.");
  }

  const text = comments.join("\n\n");

  const boxHeight =
    doc.heightOfString(text, {
      width: 475,
      lineGap: 3,
    }) + 30;

  if (doc.y + boxHeight > 720) {
    doc.addPage();
  }

  const y = doc.y;

  doc.roundedRect(40, y, 515, boxHeight, 8).fillAndStroke("#F8FAFC", "#D1D5DB");

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("black")
    .text(text, 55, y + 15, {
      width: 475,
      align: "left",
      lineGap: 3,
    });

  doc.y = y + boxHeight + 12;
};
