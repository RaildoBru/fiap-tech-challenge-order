import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema(
    {}, { collection: 'Order' }
);

/*
var customerSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'customers' }
);
*/

const Order = mongoose.model("Order", OrderSchema);

export default Order;

/*
model Order {
  id         String         @id @default(auto()) @map("_id") @db.ObjectId
  customer   Customer?       @relation(fields: [customerId], references: [id])
  customerId String?         @db.ObjectId
  total      Float
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt
  products   OrderProduct[]
  status     OrderStatus
  statusNum  Int
}

*/
