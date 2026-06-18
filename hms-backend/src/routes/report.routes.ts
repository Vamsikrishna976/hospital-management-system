import express from "express";
import { getReports } from "../controllers/report.controller.ts";

const router = express.Router();

router.get("/", getReports);

export default router;
