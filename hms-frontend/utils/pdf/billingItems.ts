import PDFDocument from "pdfkit";

const TABLE = {
  x: 40,
  width: 515,
  rowHeight: 30,
  headerHeight: 28,
};

const COL = {
  medicine: 180,
  batch: 80,
  qty: 45,
  price: 70,
  gst: 50,
  amount: 90,
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

  doc.text("Medicine", x, y + 8, { width: COL.medicine });

  x += COL.medicine;
  doc.text("Batch", x, y + 8, { width: COL.batch });

  x += COL.batch;
  doc.text("Qty", x, y + 8, { width: COL.qty });

  x += COL.qty;
  doc.text("Price", x, y + 8, { width: COL.price });

  x += COL.price;
  doc.text("GST", x, y + 8, { width: COL.gst });

  x += COL.gst;
  doc.text("Amount", x, y + 8, { width: COL.amount });
};

export const drawBillingItems = (
  doc: PDFDocument,
  items: any[]
) => {

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("MEDICINES", 40, doc.y);

  doc.moveDown(0.5);

  let y = doc.y;

  drawHeader(doc, y);

  y += TABLE.headerHeight;

  items.forEach((item, index) => {

    if (y + TABLE.rowHeight > 720) {
      doc.addPage();

      y = 50;

      drawHeader(doc, y);

      y += TABLE.headerHeight;
    }

    doc
      .rect(TABLE.x, y, TABLE.width, TABLE.rowHeight)
      .fill(index % 2 === 0 ? "#F9FAFB" : "#FFFFFF");

    doc
      .rect(TABLE.x, y, TABLE.width, TABLE.rowHeight)
      .stroke("#D1D5DB");

    doc
      .fillColor("black")
      .font("Helvetica")
      .fontSize(10);

    let x = TABLE.x + 8;

    doc.text(
      item.medicineName,
      x,
      y + 9,
      {
        width: COL.medicine - 10,
        ellipsis: true,
      }
    );

    x += COL.medicine;

    doc.text(
      item.batchNumber ?? "-",
      x,
      y + 9
    );

    x += COL.batch;

    doc.text(
      String(item.quantity),
      x,
      y + 9
    );

    x += COL.qty;

    doc.text(
      `₹${Number(item.price).toFixed(2)}`,
      x,
      y + 9
    );

    x += COL.price;

    doc.text(
      `${item.gst ?? 0}%`,
      x,
      y + 9
    );

    x += COL.gst;

    const total =
      item.total ??
      item.quantity * item.price;

    doc.text(
      `₹${Number(total).toFixed(2)}`,
      x,
      y + 9
    );

    y += TABLE.rowHeight;
  });

  doc.x = 40;
  doc.y = y + 20;
};