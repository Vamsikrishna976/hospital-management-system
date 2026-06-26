import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import prisma from "../utils/prisma.ts";
import { drawHospitalHeader } from "../utils/pdf/header.ts";
import { drawFooter } from "../utils/pdf/footer.ts";

import { drawPharmacyBillInfo } from "../utils/pdf/pharmacyBillInfo.ts";
import { drawPharmacyPatientCard } from "../utils/pdf/pharmacyPatientCard.ts";
import { drawPharmacyItemsTable } from "../utils/pdf/pharmacyItemsTable.ts";
import { drawPharmacyPaymentSummary } from "../utils/pdf/pharmacyPaymentSummary.ts";
import { drawPharmacySignature } from "../utils/pdf/pharmacySignature.ts";

export const downloadPharmacyBill = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const bill = await prisma.pharmacyBill.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${bill.billNumber}.pdf`,
    );

    doc.pipe(res);

    // ======================================
    // HOSPITAL HEADER
    // ======================================

    drawHospitalHeader(doc);

    // Start the next section below the header
    doc.y = 180;

    // ======================================
    // HEADER
    // ======================================

    drawHospitalHeader(doc);

    doc.y = 180;

    // ======================================
    // BILL INFORMATION
    // ======================================

    drawPharmacyBillInfo(doc, bill);

    // ======================================
    // PATIENT INFORMATION
    // ======================================

    drawPharmacyPatientCard(doc, bill);

    // ======================================
    // MEDICINES TABLE
    // ======================================

    drawPharmacyItemsTable(doc, bill.items);

    // ======================================
    // PAYMENT SUMMARY
    // ======================================

    drawPharmacyPaymentSummary(doc, bill);

    // ======================================
    // SIGNATURE
    // ======================================

    drawPharmacySignature(doc, bill);

    // ======================================
    // FOOTER
    // ======================================

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate PDF",
    });
  }
};

export const viewPharmacyBill = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const bill = await prisma.pharmacyBill.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename=${bill.billNumber}.pdf`,
    );

    doc.pipe(res);

    // ======================================
    // HOSPITAL HEADER
    // ======================================

    drawHospitalHeader(doc);

    // Start the next section below the header
    doc.y = 180;

    // ======================================
    // HEADER
    // ======================================

    drawHospitalHeader(doc);

    doc.y = 180;

    // ======================================
    // BILL INFORMATION
    // ======================================

    drawPharmacyBillInfo(doc, bill);

    // ======================================
    // PATIENT INFORMATION
    // ======================================

    drawPharmacyPatientCard(doc, bill);

    // ======================================
    // MEDICINES TABLE
    // ======================================

    drawPharmacyItemsTable(doc, bill.items);

    // ======================================
    // PAYMENT SUMMARY
    // ======================================

    drawPharmacyPaymentSummary(doc, bill);

    // ======================================
    // SIGNATURE
    // ======================================

    drawPharmacySignature(doc, bill);

    // ======================================
    // FOOTER
    // ======================================

    drawFooter(doc);

    doc.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate PDF",
    });
  }
};
