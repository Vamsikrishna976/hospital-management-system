import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.ts";
import { createAuditLog } from "../utils/audit.ts";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    await createAuditLog(`Created ${role} user: ${email}`, "ADMIN");

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.user.delete({
      where: {
        id,
      },
    });

    await createAuditLog(`Deleted user: ${id}`, "ADMIN");

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    const { role } = req.body;
    const id = req.params.id as string;

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    await createAuditLog(`Updated role to ${role}`, "ADMIN");
    
    return res.json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update role",
    });
  }
};
