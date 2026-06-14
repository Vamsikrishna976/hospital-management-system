import { Router } from "express";
import { addMedicine } from "../controllers/medicine.controller.ts";

const router = Router();

router.post("/", addMedicine);

export default router;