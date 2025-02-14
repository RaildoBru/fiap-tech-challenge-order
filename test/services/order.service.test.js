import { expect, jest } from '@jest/globals';
import OrderService from '../../src/services/order.service';
import Order from '../../src/models/order.model';

jest.mock('../../src/models/order.model');

describe('OrderService', () => {
    describe('createOrder', () => {
        it('should create an order', async () => {
            const customerId = '123';
            const items = [
                { price: 10, quantity: 2 },
                { price: 20, quantity: 1 }
            ];
            const totalPrice = 40;

            OrderService.fetchProductDetails = jest.fn().mockResolvedValue({ name: 'Product', price: 10, description: 'Description', category: 'Category' });

            Order.create.mockResolvedValue({ customerId, items, totalPrice });

            const order = await OrderService.createOrder(customerId, items);

            expect(Order.create).toHaveBeenCalled();
            expect(order).toEqual({ customerId, items, totalPrice });
        });
    });

    describe('getOrders', () => {
        it('should return all orders', async () => {
            const orders = [
                { customerId: '123', items: [], totalPrice: 0 },
                { customerId: '456', items: [], totalPrice: 0 }
            ];

            Order.find.mockResolvedValue(orders);

            const result = await OrderService.getOrders();

            expect(result).toEqual(orders);
        });
    });

    describe('getOrderById', () => {
        it('should return an order by id', async () => {
            const id = '123';
            const order = { customerId: '123', items: [], totalPrice: 0 };

            Order.findById.mockResolvedValue(order);

            const result = await OrderService.getOrderById(id);

            expect(result).toEqual(order);
        });
    });

    describe('updateOrderStatus', () => {
        it('should update an order status', async () => {
            const id = '123';
            const status = 'DELIVERED';
            const order = { customerId: '123', items: [], totalPrice: 0 };

            Order.findByIdAndUpdate.mockResolvedValue(order);

            const result = await OrderService.updateOrderStatus(id, status);

            expect(result).toEqual(order);
        });
    });

    describe('fetchProductDetails', () => {
        it('should fetch product details', async () => {
            const productId = '123';
            const product = { name: 'Product', price: 10, description: 'Description', category: 'Category' };

            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(product)
            });

            const result = await OrderService.fetchProductDetails(productId);

            expect(result).toEqual(product);
        });

        it('should throw an error when failed to fetch product details', async () => {
            const productId = '123';
            const error = new Error('Failed to fetch product details');

            global.fetch = jest.fn().mockResolvedValue({
                ok: false
            });

            try {
                await OrderService.fetchProductDetails(productId);
            } catch (e) {
                expect(e).toEqual(error);
            }
        });
    });
});