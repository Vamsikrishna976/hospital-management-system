import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createBilling = async (req: Request, res: Response) => {
  try {
    const { opRecordId, consultationFee, medicineFee, labFee, otherFee } =
      req.body;

    const totalAmount =
      Number(consultationFee) +
      Number(medicineFee) +
      Number(labFee) +
      Number(otherFee);

    // console.log("Received OP Record:", opRecordId);
    const opRecord = await prisma.oPRecord.findUnique({
      where: {
        id: opRecordId,
      },
    });

    console.log("Found op Record:", opRecord);

    if (!opRecord) {
      return res.status(404).json({
        message: "OP Record not found",
      });
    }

    const billCount = await prisma.billing.count();

    const billNumber = `BILL-${new Date().getFullYear()}-${String(
      billCount + 1,
    ).padStart(5, "0")}`;

    const billing = await prisma.billing.create({
      data: {
        billNumber,
        opRecordId,
        consultationFee,
        medicineFee,
        labFee,
        otherFee,
        totalAmount,
      },
    });

    return res.status(201).json({
      message: "Bill Generated",
      data: billing,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate bill",
    });
  }
};

// export const getBilling = async (req: Request, res: Response) => {
//   try {
//     const opRecordId = req.params.opRecordId as string;

//     const billing = await prisma.billing.findUnique({
//       where: {
//         opRecordId,
//       },

//       include: {
//         opRecord: {
//           include: {
//             patient: true,
//           },
//         },
//       },
//     });

//     if (!billing) {
//       return res.status(404).json({
//         message: "Bill not found",
//       });
//     }

//     return res.status(200).json(billing);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Failed to fetch bill",
//     });
//   }
// };

export const getBilling = async (req: Request, res: Response) => {
  try {
    const search = req.params.search as string;

    console.log("Searching Billing:", search);

    const billing = await prisma.billing.findFirst({
      where: {
        OR: [
          {
            billNumber: search,
          },
          {
            opRecordId: search,
          },
          {
            opRecord: {
              opNumber: search,
            },
          },
          {
            opRecord: {
              patient: {
                mobile: search,
              },
            },
          },
        ],
      },

      include: {
        opRecord: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!billing) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    return res.status(200).json(billing);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bill",
    });
  }
};

export const payBill = async (req: Request, res: Response) => {
  try {
    const billingId = req.params.id as string;

    console.log("PAY REQUEST RECEIVED:", billingId);

    const billing = await prisma.billing.update({
      where: {
        id: billingId,
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    console.log("UPDATED BILL:", billing);

    return res.json({
      message: "Payment Successful",
      data: billing,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to process payment",
    });
  }
};
export const getBillingHistory = async (req: Request, res: Response) => {
  try {
    const bills = await prisma.billing.findMany({
      include: {
        opRecord: {
          include: {
            patient: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(bills);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch billing history",
    });
  }
};
