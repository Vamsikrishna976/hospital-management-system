import PDFDocument from "pdfkit";

const TABLE = {
  x: 40,
  width: 515,
  rowHeight: 36,
  headerHeight: 34,
};

const COL = {
  medicine: 180,
  batch: 70,
  qty: 45,
  price: 70,
  gst: 55,
  total: 95,
};

const drawHeader = (doc: any, y: number) => {
  doc
    .roundedRect(TABLE.x, y, TABLE.width, TABLE.headerHeight, 4)
    .fill("#2563EB");

  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(10);

  let x = TABLE.x + 8;

  doc.text("Medicine", x, y + 8, {
    width: COL.medicine,
  });

  x += COL.medicine;

  doc.text("Batch", x, y + 8, {
    width: COL.batch,
  });

  x += COL.batch;

  doc.text("Qty", x, y + 8, {
    width: COL.qty,
  });

  x += COL.qty;

  doc.text("Unit Price", x, y + 8, {
    width: COL.price,
  });

  x += COL.price;

  doc.text("GST", x, y + 8, {
    width: COL.gst,
  });

  x += COL.gst;

  doc.text("Total", x, y + 8, {
    width: COL.total,
  });
};

export const drawPharmacyItemsTable = (
  doc: any,
  items: any[]
) => {

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#1E3A8A")
    .text("MEDICINE DETAILS");

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
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black");

    let x = TABLE.x + 8;

    doc.text(
      item.medicine.medicineName,
      x,
      y + 9,
      {
        width: COL.medicine - 5,
        ellipsis: true,
      }
    );

    x += COL.medicine;

    doc.text(
      item.batchNumber ?? "-",
      x,
      y + 9,
      {
        width: COL.batch,
      }
    );

    x += COL.batch;

    doc.text(
      String(item.quantity),
      x,
      y + 9,
      {
        width: COL.qty,
      }
    );

    x += COL.qty;

    doc.text(
      `₹${item.unitPrice.toFixed(2)}`,
      x,
      y + 9,
      {
        width: COL.price,
      }
    );

    x += COL.price;

    doc.text(
      `₹${item.gst.toFixed(2)}`,
      x,
      y + 9,
      {
        width: COL.gst,
      }
    );

    x += COL.gst;

    doc
      .font("Helvetica-Bold")
      .text(
        `₹${item.totalPrice.toFixed(2)}`,
        x,
        y + 9,
        {
          width: COL.total,
        }
      );

    y += TABLE.rowHeight;
  });

  doc.y = y + 20;
};