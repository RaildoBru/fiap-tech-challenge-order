import OrderService from "../services/order.service.js";
import OrderStatus from "../models/status.model.js";

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const { customerId, items } = req.body;

      if (!items) return res.status(400).json({ message: "Items não informados" });
      for (let item of items) {
        if (!item.productId || !item.quantity) {
          return res.status(400).json({ message: "Item inválido" });
        }
      }

      const order = await OrderService.createOrder(customerId, items);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      console.log(status);
      console.log(Object.values(OrderStatus));
      if (!Object.values(OrderStatus).includes(status) || !status) {
        return res.status(400).json({
          message: "Status inválido",
          validStatus: Object.values(OrderStatus)
        });
      }
      console.log(req.params.id);
      const updatedOrder = await OrderService.updateOrderStatus(req.params.id, status);
      if (!updatedOrder) return res.status(404).json({ message: "Pedido não encontrado" });

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default OrderController;