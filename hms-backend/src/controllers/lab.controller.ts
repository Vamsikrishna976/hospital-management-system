import type { Request, Response } from "express";
import labService from "../services/lab.service.ts";

class LabController {
  async createLabTest(req: Request, res: Response) {
    try {
      const labTest = await labService.createLabTest(req.body);

      return res.status(201).json({
        success: true,
        message: "Lab Test created successfully",
        data: labTest,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to create Lab Test",
      });
    }
  }
  async getAllLabTests(req: Request, res: Response) {
    try {
      const labTests = await labService.getAllLabTests();

      return res.status(200).json({
        success: true,
        count: labTests.length,
        data: labTests,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch Lab Tests",
      });
    }
  }

  async createLabOrder(req: Request, res: Response) {
    try {
      const order = await labService.createLabOrder(req.body);

      return res.status(201).json({
        success: true,
        message: "Lab Order created successfully",
        data: order,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to create Lab Order",
      });
    }
  }

  async getPendingLabOrders(req: Request, res: Response) {
    try {
      const orders = await labService.getPendingLabOrders();

      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch pending lab orders",
      });
    }
  }

  async uploadLabResult(req: Request, res: Response) {
    try {
      const itemId = req.params.itemId as string;
      console.log("Received itemId:", itemId);

      const result = await labService.uploadLabResult(itemId, req.body);

      return res.status(200).json({
        success: true,
        message: "Lab Result Uploaded Successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload Lab Result",
      });
    }
  }

  async getAllLabOrders(req: Request, res: Response) {
    try {
      const orders = await labService.getAllLabOrders();

      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch lab orders",
      });
    }
  }

  async getPatientLabHistory(req: Request, res: Response) {
    try {
      const patientId = req.params.patientId as string;

      const history = await labService.getPatientLabHistory(patientId);

      return res.status(200).json({
        success: true,
        count: history.length,
        data: history,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch patient lab history",
      });
    }
  }
  async getLabTestById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const test = await labService.getLabTestById(id);

      return res.json({
        success: true,
        data: test,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed",
      });
    }
  }

  async updateLabTest(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const test = await labService.updateLabTest(id, req.body);

      return res.json({
        success: true,
        data: test,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed",
      });
    }
  }

  async deleteLabTest(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      await labService.deleteLabTest(id);

      return res.json({
        success: true,
        message: "Lab Test Deleted Successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete Lab Test",
      });
    }
  }

  async getLabOrderItemById(req: Request, res: Response) {
    try {
      const item = await labService.getLabOrderItemById(
        req.params.itemId as string,
      );

      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch Lab Order Item",
      });
    }
  }

  async getCompletedLabOrders(req: Request, res: Response) {
  try {
    const reports = await labService.getCompletedLabOrders();

    return res.json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch completed reports",
    });
  }
}
}

export default new LabController();
