import Order from '../models/order.model.js';

const OrderService = {
  createOrder: async (customerId, items) => {
    let totalPrice = 0;

    // Enrich items with product details
    const enrichedItems = await Promise.all(items.map(async (item) => {
      const productDetails = await OrderService.fetchProductDetails(item.productId);
      if (!productDetails) {
        throw new Error(`Product details not found for ID: ${item.productId}`);
      }
      totalPrice += productDetails.price * item.quantity;
      return {
        ...item,
        productName: productDetails.name,
        price: productDetails.price,
        description: productDetails.description,
        category: productDetails.category,
        quantity: item.quantity
      };
    }));

    console.log('Enriched Items:', enrichedItems);

    const order = await Order.create({
      customerId,
      items: enrichedItems,
      totalPrice
    });
    return order;
  },

  getOrders: async () => {
    return await Order.find();
  },

  getOrderById: async (id) => {
    return await Order.findById(id);
  },

  updateOrderStatus: async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  },

  fetchProductDetails: async (productId) => {
    try {
      // Using the internal k8s service DNS
      const response = await fetch(`http://ms-product:8080/api/v1/products/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details for ID: ${productId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product details: ${error.message}`);
      throw error;
    }
  }
};
export default OrderService;
