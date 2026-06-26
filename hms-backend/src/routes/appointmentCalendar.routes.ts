import express from "express";
import { getAppointmentCalendar } from "../controllers/appointmentCalendar.controller.ts";

const router = express.Router();

router.get("/", getAppointmentCalendar);

export default router;