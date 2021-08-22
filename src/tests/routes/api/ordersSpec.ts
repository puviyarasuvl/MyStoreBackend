import supertest from 'supertest';
import app from '../../../index';
import axios from 'axios';

const request = supertest(app);

let customerAuthToken: string;

describe('Testing orders route', () => {
    it('[get] /api/orders should return all the orders information', async () => {
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

        const response = await request
            .get('/api/orders')
            .type('form')
            .send({ userId: 'testUser1' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.length).toEqual(1);
    });

    it('[post] /api/orders/addProduct should allow user to add products to the cart (open order)', async () => {
        const response = await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ productId: 3, quantity: 5, userId: 'testUser1' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body).toEqual({
            id: 3,
            orderid: 2,
            productid: 3,
            quantity: 5,
        });
    });

    it('[get] /api/orders/2 should return specified order details to the user', async () => {
        const response = await request
            .get('/api/orders/2')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.userid).toEqual('testUser1');
        expect(response.body.status).toEqual('open');
    });

    it('[patch] /api/orders should allow user to update the status', async () => {
        const response = await request
            .patch('/api/orders')
            .type('form')
            .send({ orderId: 2, status: 'placed' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.status).toEqual('placed');
    });
});
