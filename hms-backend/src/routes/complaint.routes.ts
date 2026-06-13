import { Router } from "express";
import { createComplaint } from "../controllers/complaint.controller.ts";

const router = Router();

router.post("/", createComplaint);

export default router;