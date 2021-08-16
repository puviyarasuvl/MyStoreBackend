import {
    OrderDetails,
    CustomerDashboard,
    CompletedOrderDetails,
} from '../../services/customerDashboard';
import { OrderModel } from '../../models/order';

const orderModel = new OrderModel();
const customerDashboard = new CustomerDashboard();

const expectedOrderDetails: OrderDetails = {
    userId: 'testUser2',
    orderId: 3,
    orderStatus: 'open',
    total: 409.97,
    createdDate: '7/12/2021, 7:44:54 PM',
    products: [{ productId: 2, quantity: 1 }],
};

expectedOrderDetails.products.push({ productId: 3, quantity: 2 });

const expectedCompletedOrders: CompletedOrderDetails = {
    userId: 'testUser2',
    orders: [
        {
            orderId: 3,
            orderStatus: 'placed',
            total: 409.97,
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 1 },
                { productId: 3, quantity: 2 },
            ],
        },
        {
            orderId: 4,
            orderStatus: 'placed',
            total: 4099.7,
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 10 },
                { productId: 3, quantity: 20 },
            ],
        },
    ],
};

describe('Testing Customer Dashboard', () => {
    describe('currentOrder method', () => {
        beforeAll(async () => {
            // Create some new orders
            expectedOrderDetails.createdDate = new Date().toLocaleString();
            await orderModel.addProduct(2, 1, 'testUser2');
            await orderModel.addProduct(3, 2, 'testUser2');
        });

        it('expect no of orders to be 1', async () => {
            const result = await orderModel.index('testUser2');
            expect(result.length).toEqual(1);
        });

        it('should return open order details for the given user', async () => {
            const result = await customerDashboard.currentOrder('testUser2');
            expect(result).toEqual(expectedOrderDetails);
        });

        it('close the order id 3 for testUser2', async () => {
            const result = await orderModel.update(3, 'placed');
            expect(result.status).toEqual('placed');
        });

        it('should throw msg when cart is empty', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                const result = await customerDashboard.currentOrder(
                    'testUser2'
                );
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(new Error('Shopping Cart is empty'));
        });
    });

    describe('completedOrders method', () => {
        beforeAll(async () => {
            // Create some new orders
            expectedCompletedOrders.orders[0].createdDate =
                new Date().toLocaleString();
            expectedCompletedOrders.orders[1].createdDate =
                new Date().toLocaleString();
            await orderModel.addProduct(2, 10, 'testUser2');
            await orderModel.addProduct(3, 20, 'testUser2');
        });

        it('expect no of orders to be 2', async () => {
            const result = await orderModel.index('testUser2');
            expect(result.length).toEqual(2);
        });

        it('close the order id 3 for testUser2', async () => {
            const result = await orderModel.update(4, 'placed');
            expect(result.status).toEqual('placed');
        });

        it('should return completed orders for the given user', async () => {
            const result = await customerDashboard.completedOrders('testUser2');
            expect(result).toEqual(expectedCompletedOrders);
        });

        it('should throw error id no closed orders found for the user', async () => {
            let error;
            expect(error).toBeUndefined();
            try {
                const result = await customerDashboard.completedOrders(
                    'testUser4'
                );
            } catch (err) {
                error = err;
            }
            expect(error).toEqual(
                new Error('No closed orders found for the user')
            );
        });
    });
});
