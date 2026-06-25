import prisma from "../utils/prisma.ts";

class LabService {
  async createLabTest(data: {
    testCode: string;
    testName: string;
    category: string;
    price: number;
    description?: string;
  }) {
    return await prisma.labTest.create({
      data,
    });
  }

  async getAllLabTests() {
    return await prisma.labTest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createLabOrder(data: {
    patientId: string;
    doctorId: string;
    tests: string[];
  }) {
    return await prisma.labOrder.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        items: {
          create: data.tests.map((testId) => ({
            labTestId: testId,
          })),
        },
      },
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
    });
  }

  async getPendingLabOrders() {
    return await prisma.labOrder.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async uploadLabResult(
    itemId: string,
    data: {
      result: string;
      unit: string;
      referenceRange: string;
      remarks?: string;
    },
  ) {
    // Update the Lab Order Item
    const updatedItem = await prisma.labOrderItem.update({
      where: {
        id: itemId,
      },
      data: {
        result: data.result,
        unit: data.unit,
        referenceRange: data.referenceRange,
        remarks: data.remarks,
        completedAt: new Date(),
      },
      include: {
        labTest: true,
        order: true,
      },
    });

    // Get all items belonging to the same order
    const orderItems = await prisma.labOrderItem.findMany({
      where: {
        orderId: updatedItem.orderId,
      },
    });

    // Check whether every item has a result
    const allCompleted = orderItems.every(
      (item) => item.result !== null && item.result !== "",
    );

    // If yes, mark the Lab Order as COMPLETED
    if (allCompleted) {
      await prisma.labOrder.update({
        where: {
          id: updatedItem.orderId,
        },
        data: {
          status: "COMPLETED",
        },
      });
    }

    return updatedItem;
  }

  async getPatientLabHistory(patientId: string) {
    return await prisma.labOrder.findMany({
      where: {
        patientId,
      },
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getAllLabOrders() {
    return await prisma.labOrder.findMany({
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getLabOrderById(orderId: string) {
    return await prisma.labOrder.findUnique({
      where: {
        id: orderId,
      },
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
    });
  }
  async getLabTestById(id: string) {
    return await prisma.labTest.findUnique({
      where: { id },
    });
  }

  async updateLabTest(
    id: string,
    data: {
      testCode: string;
      testName: string;
      category: string;
      price: number;
      description?: string;
    },
  ) {
    return await prisma.labTest.update({
      where: { id },
      data,
    });
  }

  async deleteLabTest(id: string) {
    return await prisma.labTest.delete({
      where: {
        id,
      },
    });
  }

  async getLabOrderItemById(itemId: string) {
    return await prisma.labOrderItem.findUnique({
      where: {
        id: itemId,
      },
      include: {
        labTest: true,
        order: {
          include: {
            patient: true,
            doctor: true,
          },
        },
      },
    });
  }

  async getCompletedLabOrders() {
    return await prisma.labOrder.findMany({
      where: {
        status: "COMPLETED",
      },
      include: {
        patient: true,
        doctor: true,
        items: {
          include: {
            labTest: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new LabService();
