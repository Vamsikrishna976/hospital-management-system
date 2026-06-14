import { Router } from "express";

import {
  getPatientHistory,
} from "../controllers/history.controller.ts";

const router = Router();

router.get("/:mobile", getPatientHistory);

export default router;