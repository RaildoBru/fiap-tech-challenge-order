import Order from "../models/order.model.js";
import axios from "axios";

//const PRODUCT_SERVICE_URL = "http://localhost:4000/products";

/*const createOrder = async (customerName, items) => {
  let totalPrice = 0;
  
  for (let item of items) {
    const { data: product } = await axios.get(`${PRODUCT_SERVICE_URL}/${item.productId}`);
    totalPrice += product.price * item.quantity;
  }

  const order = await Order.create({ customerName, items, totalPrice });
  return order;
};*/

const getOrders = async () => {
    return await Order.find();
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

/*const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};*/

export default { getOrders, getOrderById };
//export default { createOrder, getOrders, getOrderById, updateOrderStatus };
