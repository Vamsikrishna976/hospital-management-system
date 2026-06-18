import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch audit logs",
    });
  }
};