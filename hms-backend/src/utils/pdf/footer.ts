export const drawFooter = (doc: any) => {
  const currentY = doc.y;

  const footerY = doc.page.height - 60;

  doc.save();

  doc
    .moveTo(40, footerY)
    .lineTo(555, footerY)
    .strokeColor("#D1D5DB")
    .lineWidth(1)
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#555");

  doc.text(
    "This is a computer-generated pharmacy bill.",
    40,
    footerY + 10,
    {
      width: 515,
      align: "center",
      lineBreak: false,
    }
  );

  doc.text(
    "Sri Kavya Krishna Super Speciality Hospital",
    40,
    footerY + 24,
    {
      width: 515,
      align: "center",
      lineBreak: false,
    }
  );

  doc.text(
    "Bangalore | +91 9876543210 | pharmacy@hospital.com",
    40,
    footerY + 38,
    {
      width: 515,
      align: "center",
      lineBreak: false,
    }
  );

  doc.restore();

  // Restore cursor
  doc.x = 40;
  doc.y = currentY;
};