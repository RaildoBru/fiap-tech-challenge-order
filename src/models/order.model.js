import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        total : Number,
        status: {
            type: String,
            enum: [ "Pending" ,"Received", "Preparing", "Ready", "Finished", "Refused" ],
            default: 'Pending'
        },
        statusNum: {
            type: Number,
            enum: [ 0,1, 2, 3, 4, 5 ],
            default: 0
        },
        createdAt: Date,
        updatedAt: Date,
        products : {
            name : String,
            price: Number,
            description: String,
            category: {
                type: String,
                enum: ["Food", "Beverage", "Snack", "Dessert"],
            }

        }

    },{ collection: 'Order' }
);
OrderSchema.set('timestamps', true);
OrderSchema.set('versionKey', false);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
