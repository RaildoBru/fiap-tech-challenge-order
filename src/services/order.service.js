import Order from '../models/order.model.js';

const OrderService = {
  createOrder: async (customerId, items) => {
    let totalPrice = 0;
    
    for (let item of items) {
      totalPrice += item.price * item.quantity;
    }

    const order = await Order.create({ customerId, items, totalPrice });
    return order;
  },

  getOrders: async () => {
      return await Order.find();
  },

  getOrderById: async (id) => {
    return await Order.findById(id);
  },

  updateOrderStatus: async (id, status) => {
    return await Order.updateOne(id, { status });
  }
};
export default OrderService;
