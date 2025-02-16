import { where } from "sequelize";
import Order from "../models/order.model.js";
import axios from "axios";
import Enum from "enum";

const statusOrder = new Enum({
  'Pending' : 0 ,
  'Received' : 1,
  'Preparing' : 2,
  'Ready' : 3,
  'Finished' : 4,
  'Refused' : 5
} );

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

const findOrderStatus = async () => {
  return await Order.find({}).where("statusNum").in([1,2,3]).sort({"statusNum" : -1, "createdAt" : 1});
};

const updateOrderStatus = async (id, status) => {

  return await Order.findByIdAndUpdate(id, {
    status : status, statusNum : statusOrder.get(status).value
  },
  { new: true });
};

export default { getOrders, getOrderById, findOrderStatus, updateOrderStatus };
//export default { createOrder, getOrders, getOrderById, updateOrderStatus };
