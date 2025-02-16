import express from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus, findStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/status", findStatus);
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;
