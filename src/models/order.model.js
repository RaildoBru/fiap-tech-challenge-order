import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema(
    {}, { collection: 'Order' }
);


const Order = mongoose.model("Order", OrderSchema);

export default Order;

//testet