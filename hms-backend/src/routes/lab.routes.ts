import { Router } from "express";
import labController from "../controllers/lab.controller.ts";

const router = Router();

router.post("/tests", labController.createLabTest);

router.get("/tests", labController.getAllLabTests);

router.post("/orders", labController.createLabOrder);

router.get("/orders/pending", labController.getPendingLabOrders);

router.put("/results/:itemId", labController.uploadLabResult);

router.get("/orders/all", labController.getAllLabOrders);

router.get("/history/:patientId", labController.getPatientLabHistory);

router.get("/tests/:id", labController.getLabTestById);

router.put("/tests/:id", labController.updateLabTest);

router.delete("/tests/:id", labController.deleteLabTest);

router.get("/results/:itemId", labController.getLabOrderItemById);

router.get("/orders/completed", labController.getCompletedLabOrders);

export default router;
