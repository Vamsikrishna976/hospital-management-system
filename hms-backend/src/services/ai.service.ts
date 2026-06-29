import model from "../utils/gemini.ts";
import prisma from "../utils/prisma.ts";


export const askGemini = async (prompt: string) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

export const getPatientContext = async (patientId: string) => {
  return await prisma.patient.findUnique({
    where: {
      id: patientId,
    },

    include: {
      opRecords: {
        orderBy: {
          createdAt: "desc",
        },

        take: 5,

        include: {
          complaint: true,

          appointment: {
            include: {
              prescription: {
                include: {
                  medicines: true,
                },
              },
            },
          },

          billing: true,
        },
      },

      labOrders: {
        include: {
          items: {
            include: {
              labTest: true,
            },
          },
        },
      },

      ipAdmissions: {
        include: {
          bed: true,
          bill: true,
        },
      },
    },
  });
};