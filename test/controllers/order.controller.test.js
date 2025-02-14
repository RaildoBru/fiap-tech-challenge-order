import OrderController from '../../src/controllers/order.controller.js';
import OrderService from '../../src/services/order.service.js';
import { jest } from '@jest/globals';

jest.mock('../../src/services/order.service.js');

describe('Order Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createOrder', () => {
        it('should return 201 when order is created', async () => {
            const req = {
                body: {
                    customerId: 1,
                    items: [
                        {
                            productId: 1,
                            productName: "Product 1",
                            quantity: 1,
                            price: 100
                        }
                    ]
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await OrderController.createOrder(req, res);
            expect(OrderService.createOrder).toHaveBeenCalled();
            expect(OrderService.createOrder).toHaveBeenCalledWith(req.body.customerId, req.body.items);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return 400 when items is not provided', async () => {
            const req = {
                body: {
                    customerId: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await OrderController.createOrder(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 500 when an error occurs', async () => {
            const req = {
                body: {
                    customerId: 1,
                    items: [
                        {
                            productId: 1,
                            productName: "Product 1",
                            quantity: 1,
                            price: 100
                        }
                    ]
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock a database error
            OrderService.createOrder.mockRejectedValue(new Error('Connection failed'));

            await OrderController.createOrder(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('getOrders', () => {
        it('should return 200 when orders are found', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await OrderController.getOrders(req, res);
            expect(OrderService.getOrders).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 500 when an error occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock a database error
            OrderService.getOrders.mockRejectedValue(new Error('Connection failed'));

            await OrderController.getOrders(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('getOrderById', () => {
        it('should return 200 when order is found', async () => {
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            OrderService.getOrderById.mockResolvedValue({ orderId: 1 });

            await OrderController.getOrderById(req, res);
            expect(OrderService.getOrderById).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 404 when order is not found', async () => {
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            OrderService.getOrderById.mockResolvedValue(null);

            await OrderController.getOrderById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 500 when an error occurs', async () => {
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock a database error
            OrderService.getOrderById.mockRejectedValue(new Error('Connection failed'));

            await OrderController.getOrderById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('updateOrderStatus', () => {
        it('should return 200 when order status is updated', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    status: 'DELIVERED'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            OrderService.updateOrderStatus.mockResolvedValue({ orderId: 1, status: 'DELIVERED' });

            await OrderController.updateOrderStatus(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 404 when order is not found', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    status: 'DELIVERED'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            OrderService.updateOrderStatus.mockResolvedValue(null);

            await OrderController.updateOrderStatus(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 400 when status is not provided', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await OrderController.updateOrderStatus(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 500 when an error occurs', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    status: 'DELIVERED'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock a database error
            OrderService.updateOrderStatus.mockRejectedValue(new Error('Connection failed'));

            await OrderController.updateOrderStatus(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });
    });
});