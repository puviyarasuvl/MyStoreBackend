import pool from '../database';

export type Order = {
    id: number;
    userid: string;
    status: string;
    total: number;
    createddate: string;
};

export type OrderProduct = {
    id: number;
    orderid: number;
    productid: number;
    quantity: number;
};

/* Class to represent the orders table */
export class OrderModel {
    /* method : index. Returns all the avilable orders
       input params :
       return : Promise<Order []> */
    async index(userId: string): Promise<Order[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM orders WHERE userId=$1';
            const result = await conn.query(sql, [userId]);

            conn.release();
            return result.rows;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the orders', err);

            throw err;
        }
    }

    /* method : show. Returns the order details based on the order id
       input params : order id
       return : Promise<Order> */
    async show(orderId: number): Promise<Order> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM orders WHERE id=$1';
            const result = await conn.query(sql, [orderId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the order details', err);

            throw err;
        }
    }

    /* method : update. Updates the status information in the order id
       input params : Order id, status
       return : Promise<Order> */
    async update(orderId: number, status: string): Promise<Order> {
        const conn = await pool.connect();

        try {
            const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
            const result = await conn.query(sql, [status, orderId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to update the order details', err);

            throw err;
        }
    }

    /* method : addProduct. Adds the given product details into the order
       input params : Order id, Product id, quantity
       return : Promise<OrderProducts> */
    async addProduct(
        productId: number,
        quantity: number,
        userId: string
    ): Promise<OrderProduct> {
        const conn = await pool.connect();

        try {
            let sql = 'SELECT * FROM orders WHERE userId=$1 AND status=$2';
            let result = await conn.query(sql, [userId, 'open']);

            // Add products to the order only if the order status is Open
            if (result.rows.length && result.rows[0].status === 'open') {
                const orderId = result.rows[0].id;

                sql =
                    'INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *';
                const res = await conn.query(sql, [
                    orderId,
                    productId,
                    quantity,
                ]);

                sql = 'SELECT price FROM products WHERE id=$1';
                result = await conn.query(sql, [productId]);

                const price = result.rows[0].price * quantity;

                sql = 'SELECT total FROM orders WHERE id=$1';
                result = await conn.query(sql, [orderId]);

                const total = result.rows[0].total + price;

                sql = 'UPDATE orders SET total=$1 WHERE id=$2';
                result = await conn.query(sql, [total, orderId]);

                conn.release();
                return res.rows[0];
            } else {
                const date = new Date().toLocaleString();
                const status = 'open';
                let total = 0;

                sql = 'SELECT price FROM products WHERE id=$1';
                result = await conn.query(sql, [productId]);

                total = result.rows[0].price * quantity;

                sql =
                    'INSERT INTO orders (userId, status, total, createdDate) VALUES ($1, $2, $3, $4) RETURNING *';
                result = await conn.query(sql, [userId, status, total, date]);

                const orderId = result.rows[0].id;

                sql =
                    'INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *';
                result = await conn.query(sql, [orderId, productId, quantity]);

                conn.release();
                return result.rows[0];
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to add the product details into order', err);

            throw err;
        }
    }

    /* method : updateQuantity. Updates quantity for the given product
       input params : Product id, quantity, user id
       return : Promise<OrderProducts> */
    async updateQuantity(
        productId: number,
        quantity: number,
        userId: string
    ): Promise<OrderProduct> {
        const conn = await pool.connect();

        try {
            let sql = 'SELECT * FROM orders WHERE userId=$1 AND status=$2';
            let result = await conn.query(sql, [userId, 'open']);

            // Check for the open order
            if (result.rows.length && result.rows[0].status === 'open') {
                const orderId = result.rows[0].id;

                sql =
                    'SELECT quantity FROM order_products WHERE orderid=$1 AND productid=$2';
                const qtyRes = await conn.query(sql, [orderId, productId]);

                sql =
                    'UPDATE order_products set quantity=$1 WHERE orderid=$2 AND productid=$3 RETURNING *';
                const res = await conn.query(sql, [
                    quantity,
                    orderId,
                    productId,
                ]);

                sql = 'SELECT price FROM products WHERE id=$1';
                result = await conn.query(sql, [productId]);

                const price =
                    result.rows[0].price * (quantity - qtyRes.rows[0].quantity);

                sql = 'SELECT total FROM orders WHERE id=$1';
                result = await conn.query(sql, [orderId]);

                const total = result.rows[0].total + price;

                sql = 'UPDATE orders SET total=$1 WHERE id=$2';
                result = await conn.query(sql, [total, orderId]);

                conn.release();
                return res.rows[0];
            } else {
                conn.release();

                console.log('Failed to get the cart details');

                throw new Error('Failed to get the cart details');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to update the quantity', err);

            throw err;
        }
    }

    /* method : removeProduct. Removes give product from cart
       input params : Product id, user id
       return : Promise<number> */
    async removeProduct(productId: number, userId: string): Promise<number> {
        const conn = await pool.connect();
        try {
            let sql = 'SELECT * FROM orders WHERE userId=$1 AND status=$2';
            let result = await conn.query(sql, [userId, 'open']);

            // Check for the open order
            if (result.rows.length && result.rows[0].status === 'open') {
                const orderId = result.rows[0].id;

                sql =
                    'SELECT quantity FROM order_products WHERE orderid=$1 AND productid=$2';
                const qtyRes = await conn.query(sql, [orderId, productId]);

                sql =
                    'DELETE FROM order_products WHERE orderid=$1 AND productid=$2';
                const res = await conn.query(sql, [orderId, productId]);

                sql = 'SELECT price FROM products WHERE id=$1';
                result = await conn.query(sql, [productId]);

                const price = result.rows[0].price * qtyRes.rows[0].quantity;

                sql = 'SELECT total FROM orders WHERE id=$1';
                result = await conn.query(sql, [orderId]);

                const total = result.rows[0].total - price;

                sql = 'UPDATE orders SET total=$1 WHERE id=$2';
                result = await conn.query(sql, [total, orderId]);

                conn.release();
                return res.rows[0];
            } else {
                conn.release();

                console.log('Failed to get the cart details');

                throw new Error('Failed to get the cart details');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to remove the product from cart', err);

            throw err;
        }
    }
}
