import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import labService from "../services/lab.service.ts";
import { drawHospitalHeader } from "../utils/pdf/header.ts";
import { drawReportInfo } from "../utils/pdf/reportInfo.ts";
import { drawPatientCard } from "../utils/pdf/patientCard.ts";
import { drawDoctorCard } from "../utils/pdf/doctorCard.ts";
import { drawResultsTable } from "../utils/pdf/resultsTable.ts";
import { drawInterpretation } from "../utils/pdf/interpretation.ts";
import { drawSignatures } from "../utils/pdf/signatures.ts";
import { drawFooter } from "../utils/pdf/footer.ts";
import { generateQRCode } from "../utils/pdf/qrCode.ts";

class LabReportController {
  async generateReport(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId as string;

      const report = await labService.getLabOrderById(orderId);

      if (!report) {
        return res.status(404).json({
          success: false,
          message: "Lab Report not found",
        });
      }

      const verificationUrl = `http://localhost:5000/api/lab-report/${report.id}`;

      const qrBuffer = await generateQRCode(verificationUrl);

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename=LAB-${report.id}.pdf`,
      );

      doc.pipe(res);

      // =====================================================
      // HEADER
      // =====================================================

      drawHospitalHeader(doc);

      doc.y = 180;
      console.log("After Header:", doc.y);

      // =====================================================
      // REPORT DETAILS BOX
      // =====================================================

      drawReportInfo(doc, report, qrBuffer);
      doc.moveDown();
      console.log("After Report:", doc.y);

      // =====================================================
      // PATIENT INFORMATION
      // =====================================================

      drawPatientCard(doc, report.patient);

      doc.moveDown();
      console.log("After Patient:", doc.y);

      // =====================================================
      // DOCTOR INFORMATION
      // =====================================================

      drawDoctorCard(doc, report.doctor, report.status);

      doc.moveDown();
      console.log("After Doctor:", doc.y);

      // =====================================================
      // RESULTS TABLE
      // =====================================================

      drawResultsTable(doc, report.items);
      console.log("After Results:", doc.y);

      // =====================================================
      // INTERPRETATION
      // =====================================================

      drawInterpretation(doc, report.items);
      console.log("After Interpretation:", doc.y);

      // =====================================================
      // AUTHORIZATION
      // =====================================================a

      drawSignatures(doc, report.doctor);
      console.log("After Authorization:", doc.y);

      // =====================================================
      // FOOTER
      // =====================================================

      drawFooter(doc);
      console.log("After Footer:", doc.y);

      doc.end();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to generate report",
      });
    }
  }
}

export default new LabReportController();
