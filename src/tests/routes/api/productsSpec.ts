import supertest from 'supertest';
import app from '../../../index';
import axios from 'axios';

const request = supertest(app);

let customerAuthToken: string;
let adminAuthToken: string;

describe('Testing products route', () => {
    it('[post] /api/products should return 401 for request without token', async () => {
        const response = await request
            .post('/api/products')
            .type('form')
            .send({
                productName: 'Book',
                price: 9.99,
                category: 'Readings',
                description: 'You can read it!',
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            })
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(401);
    });

    it('[post] /api/products should allow admin to add new products', async () => {
        const res = await axios({
            method: 'POST',
            url: 'https://dev-nmnw9s-h.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            data: {
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_TEST_CLIENT_ID2,
                client_secret: process.env.AUTH0_TEST_CLIENT_SECRET2,
                audience: process.env.AUTH0_AUDIENCE,
            },
        });

        adminAuthToken = res.data.access_token;

        const response = await request
            .post('/api/products')
            .type('form')
            .send({
                productName: 'Book',
                price: 9.99,
                category: 'Readings',
                description: 'You can read it!',
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            })
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);

        expect(response.body.name).toEqual('Book');
    });

    it('[post] /api/products should not allow customer to add new products', async () => {
        const res = await axios({
            method: 'POST',
            url: 'https://dev-nmnw9s-h.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            data: {
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_TEST_CLIENT_ID1,
                client_secret: process.env.AUTH0_TEST_CLIENT_SECRET1,
                audience: process.env.AUTH0_AUDIENCE,
            },
        });

        customerAuthToken = res.data.access_token;

        await request
            .post('/api/products')
            .type('form')
            .send({
                productName: 'Book',
                price: 9.99,
                category: 'Readings',
                description: 'You can read it!',
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(403);
    });

    it('[get] /api/products should return all available products information', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toEqual(200);

        expect(response.body).toEqual([
            {
                id: 2,
                name: 'Headphones',
                price: 249.99,
                category: 'Mobile Accessories',
                description: 'Listen to stuff!',
                url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: 3,
                name: 'Backpack',
                price: 79.99,
                category: 'Travel',
                description: 'Carry things around town!',
                url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
            {
                id: 4,
                name: 'Book',
                price: 9.99,
                category: 'Readings',
                description: 'You can read it!',
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
        ]);
    });

    it('[get] /api/products/4 should return product information for given id', async () => {
        const response = await request.get('/api/products/4');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 4,
            name: 'Book',
            price: 9.99,
            category: 'Readings',
            description: 'You can read it!',
            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        });
    });

    it('[delete] /api/products/ should allow admin to delete a product', async () => {
        const response = await request
            .delete('/api/products')
            .type('form')
            .send({
                productId: 4,
            })
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);
        expect(response.text).toEqual('Product deleted successfully');
    });

    it('[delete] /api/products/ should not allow customer to delete a product', async () => {
        await request
            .delete('/api/products')
            .type('form')
            .send({
                productId: 3,
            })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(403);
    });

    it('[get] /api/products/category/Mobiles should return the products in the give category', async () => {
        const response = await request.get('/api/products/category/Travel');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 3,
                name: 'Backpack',
                price: 79.99,
                category: 'Travel',
                description: 'Carry things around town!',
                url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            },
        ]);
    });
});
