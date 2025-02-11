import OrderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;
    const order = await OrderService.createOrder(customerName, items);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  
    try {
    const orders = await OrderService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
