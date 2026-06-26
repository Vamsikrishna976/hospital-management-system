import { Router } from "express";
import {
  getNotifications,
} from "../controllers/notification.controller.ts";

const router = Router();

router.get("/", getNotifications);

export default router;