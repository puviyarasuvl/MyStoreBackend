import supertest from 'supertest';
import app from '../../../index';
import axios from 'axios';

const request = supertest(app);

let customerAuthToken: string;

describe('Testing dashboard route', () => {
    it('[get] /api/dashboard/cart should return the current order details', async () => {
        const res = await axios({
            method: 'POST',
            url: 'https://my-store-app.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            data: {
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_TEST_CLIENT_ID1,
                client_secret: process.env.AUTH0_TEST_CLIENT_SECRET1,
                audience: process.env.AUTH0_AUDIENCE,
            },
        });

        customerAuthToken = res.data.access_token;

        // Create new order and add some products

        await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ productId: 3, quantity: 5, userId: 'testUser3' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ productId: 2, quantity: 3, userId: 'testUser3' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        const response = await request
            .get('/api/dashboard/cart/')
            .query({ userID: 'testUser3' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.orderStatus).toEqual('open');
        expect(response.body.products.length).toEqual(2);
    });

    it('[get] /api/dashboard/cart should return 401 for unauthenticated requests', async () => {
        await request
            .get('/api/dashboard/cart')
            .query({ userID: 'testUser3' })
            .expect(401);
    });

    it('[get] /api/dashboard/orders should return completed orders', async () => {
        const response = await request
            .get('/api/dashboard/orders')
            .query({ userId: 'testUser2' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.userId).toEqual('testUser2');
        expect(response.body.orders.length).toEqual(2);
    });
});
