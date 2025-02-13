import express from "express";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.put("/:id/status", OrderController.updateOrderStatus);

export default router;
