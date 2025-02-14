import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        customerId: { type: String, required: false },
        items: [
            {
                productId: { type: String, required: true },
                name: String,
                price: Number,
                description: String,
                category: {
                    type: String,
                    enum: ["Food", "Beverage", "Snack", "Dessert"],
                },
                quantity: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, required: true, default: "PENDING" },
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now }
    }, { collection: 'Order' }
);


const Order = mongoose.model("Order", OrderSchema);

export default Order;