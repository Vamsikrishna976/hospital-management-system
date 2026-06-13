import  { Router } from "express";
import { assignDoctor } from "../controllers/appointment.controller.ts";

const router = Router();

router.post("/assign", assignDoctor);

export default router;