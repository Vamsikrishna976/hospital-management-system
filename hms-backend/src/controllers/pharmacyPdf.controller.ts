import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import prisma from "../utils/prisma.ts";

export const downloadPharmacyBill = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const bill =
      await prisma.pharmacyBill.findUnique({
        where: { id },
      });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${bill.billNumber}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text(
      "Hospital Pharmacy Bill",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.text(`Bill No: ${bill.billNumber}`);
    doc.text(`Patient: ${bill.patientName}`);
    doc.text(`Amount: ₹${bill.totalAmount}`);
    doc.text(
      `Date: ${new Date(
        bill.createdAt
      ).toLocaleDateString()}`
    );

    doc.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate PDF",
    });
  }
};