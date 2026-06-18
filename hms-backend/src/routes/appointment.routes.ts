import { Router } from "express";
import {
  assignDoctor,
  getAppointments,
  completeAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller.ts";

const router = Router();

router.post("/assign", assignDoctor);

router.get("/", getAppointments);

router.put("/complete/:id", completeAppointment);

router.put("/cancel/:id", cancelAppointment);

export default router;
