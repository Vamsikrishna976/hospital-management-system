import PDFDocument from "pdfkit";

const TABLE = {
  x: 40,
  width: 515,
  rowHeight: 32,
  headerHeight: 30,
};

const COL = {
  test: 210,
  result: 60,
  unit: 55,
  range: 80,
  status: 50,
  remarks: 60,
};

const drawHeader = (doc: PDFDocument, y: number) => {
  doc
    .roundedRect(TABLE.x, y, TABLE.width, TABLE.headerHeight, 4)
    .fill("#2563EB");

  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(10);

  let x = TABLE.x + 8;

  doc.text("Test Name", x, y + 9, { width: COL.test });

  x += COL.test;
  doc.text("Result", x, y + 9, { width: COL.result });

  x += COL.result;
  doc.text("Unit", x, y + 9, { width: COL.unit });

  x += COL.unit;
  doc.text("Range", x, y + 9, { width: COL.range });

  x += COL.range;
  doc.text("Flag", x, y + 9, { width: COL.status });

  x += COL.status;
  doc.text("Remarks", x, y + 9, { width: COL.remarks });
};

export const drawResultsTable = (
  doc: PDFDocument,
  items: any[]
) => {

  // ==========================================
  // RESET CURSOR
  // ==========================================

  doc.x = 40;
  doc.y += 20;

  // ==========================================
  // SECTION TITLE
  // ==========================================

  const titleY = doc.y;

  doc
    .fillColor("#1E3A8A")
    .font("Helvetica-Bold")
    .fontSize(15)
    .text(
      "LABORATORY RESULTS",
      40,
      titleY,
      {
        width: 515,
        align: "left",
        lineBreak: true,
      }
    );

  // Position table below title
  let y = titleY + 30;

  drawHeader(doc, y);

  y += TABLE.headerHeight;

  // ==========================================
  // TABLE ROWS
  // ==========================================

  items.forEach((item, index) => {

    if (y + TABLE.rowHeight > 720) {
      doc.addPage();

      y = 50;

      drawHeader(doc, y);

      y += TABLE.headerHeight;
    }

    // Zebra row
    doc
      .rect(TABLE.x, y, TABLE.width, TABLE.rowHeight)
      .fill(index % 2 === 0 ? "#F9FAFB" : "#FFFFFF");

    // Border
    doc
      .rect(TABLE.x, y, TABLE.width, TABLE.rowHeight)
      .stroke("#D1D5DB");

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("black");

    let x = TABLE.x + 8;

    doc.text(item.labTest.testName, x, y + 10, {
      width: COL.test - 10,
      ellipsis: true,
    });

    x += COL.test;

    doc.text(String(item.result ?? "-"), x, y + 10);

    x += COL.result;

    doc.text(item.unit ?? "-", x, y + 10);

    x += COL.unit;

    doc.text(item.referenceRange ?? "-", x, y + 10);

    x += COL.range;

    let flag = "NORMAL";
    let color = "#16A34A";

    const remarks = (item.remarks || "").toLowerCase();

    if (remarks.includes("high")) {
      flag = "HIGH";
      color = "#DC2626";
    } else if (remarks.includes("low")) {
      flag = "LOW";
      color = "#2563EB";
    } else if (remarks.includes("critical")) {
      flag = "CRITICAL";
      color = "#B91C1C";
    }

    doc
      .fillColor(color)
      .font("Helvetica-Bold")
      .text(flag, x, y + 10);

    x += COL.status;

    doc
      .fillColor("black")
      .font("Helvetica")
      .text(item.remarks ?? "-", x, y + 10, {
        width: COL.remarks - 5,
        ellipsis: true,
      });

    y += TABLE.rowHeight;
  });

  doc.x = 40;
  doc.y = y + 20;
};