import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import prisma from "../utils/prisma.ts";

export const generatePrescriptionPDF = async (
  req: Request,
  res: Response
) => {
  try {
    const  id  = req.params.id as string;

    const prescription =
      await prisma.prescription.findUnique({
        where: { id },
        include: {
          medicines: true,
          appointment: {
            include: {
              doctor: true,
              opRecord: {
                include: {
                  patient: true,
                },
              },
            },
          },
        },
      });

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=prescription.pdf`
    );

    doc.pipe(res);

    // Hospital Header
    doc.fontSize(22)
       .text("Hospital Management System", {
         align: "center",
       });

    doc.moveDown();

    const patient =
      prescription.appointment.opRecord.patient;

    const doctor =
      prescription.appointment.doctor;

    // Patient Details
    doc.fontSize(16).text("Patient Details");
    doc.fontSize(12);

    doc.text(`Name: ${patient.fullName}`);
    doc.text(`Mobile: ${patient.mobile}`);
    doc.text(`Age: ${patient.age}`);
    doc.text(`Gender: ${patient.gender}`);

    doc.moveDown();

    // Doctor Details
    doc.fontSize(16).text("Doctor Details");
    doc.fontSize(12);

    doc.text(`Doctor: ${doctor.name}`);
    doc.text(
      `Department: ${doctor.department}`
    );

    doc.moveDown();

    // Diagnosis
    doc.fontSize(16).text("Diagnosis");
    doc.fontSize(12);

    doc.text(prescription.diagnosis);

    doc.moveDown();

    // Medicines
    doc.fontSize(16).text("Medicines");

    prescription.medicines.forEach(
      (medicine, index) => {
        doc.fontSize(12).text(
          `${index + 1}. ${
            medicine.medicineName
          } | ${medicine.dosage} | ${
            medicine.frequency
          } | ${medicine.duration}`
        );
      }
    );

    doc.moveDown();

    doc.fontSize(16).text("Notes");
    doc.fontSize(12);

    doc.text(
      prescription.notes || "No notes"
    );

    doc.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};