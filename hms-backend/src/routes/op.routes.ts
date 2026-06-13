import { Router } from "express";
import { createOP } from "../controllers/op.controller.ts";

const router = Router();

router.post("/", createOP);

export default router;