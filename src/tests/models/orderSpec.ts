import { Order, OrderModel } from '../../models/order';

const orderModel = new OrderModel();

describe('Testing Order Model', () => {
    describe('index method', () => {
        it('should return all the orders', async () => {
            const result = await orderModel.index('testUser1');

            expect(result.length).toEqual(0);
        });
    });

    describe('Testing Order Products', () => {
        describe('addProduct method', () => {
            it('should create an open order and add product', async () => {
                const result = await orderModel.addProduct(3, 5, 'testUser1');

                expect(result).toEqual({
                    id: 1,
                    orderid: 1,
                    productid: 3,
                    quantity: 5,
                });
            });

            it('should add the product successfully', async () => {
                const result = await orderModel.addProduct(2, 3, 'testUser1');
                expect(result).toEqual({
                    id: 2,
                    orderid: 1,
                    productid: 2,
                    quantity: 3,
                });
            });
        });
    });

    describe('index method', () => {
        it('should return all the orders', async () => {
            const result = await orderModel.index('testUser1');

            expect(result.length).toEqual(1);
        });
    });

    describe('show method', () => {
        it('should return order details based on given order id', async () => {
            const result = await orderModel.show(1);

            expect(result.id).toEqual(1);
            expect(result.userid).toEqual('testUser1');
            expect(result.status).toEqual('open');
            expect(result.total).toEqual(1149.92);
        });
    });

    describe('update method', () => {
        it('should update the order status to provided status', async () => {
            const result = await orderModel.update(1, 'placed');

            expect(result.status).toEqual('placed');
        });
    });
});
