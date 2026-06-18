import prisma from "./prisma.ts";

export const createAuditLog = async (
  action: string,
  userEmail: string
) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        userEmail,
      },
    });
  } catch (error) {
    console.error("Audit Log Error:", error);
  }
};