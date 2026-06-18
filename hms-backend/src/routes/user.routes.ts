import { Router } from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.delete("/:id", deleteUser);

router.put("/:id", updateUserRole);
export default router;
