const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let token;
let cartId;

beforeAll(async() => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123",
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
});

test('POST /cart should create a product in the cart', async () => {
    const product = await Product.create({
        title: "Product",
        description: "Description",
        price: "200",
        brand: "Brand"
    })
    const cart = {
        quantity: 1,
        productId: product.id
    }
    const res = await request(app)
        .post('/cart')
        .send(cart)
        .set('Authorization', `Bearer ${token}`)
    await product.destroy();
    cartId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /cart should get all products in the cart', async () => {
    const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('UPDATE /cart/:id should update a product in the cart', async () => {
    const cart = {
        quantity: 2
    }
    const res = await request(app)
        .put(`/cart/${cartId}`)
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
});

test('DELETE /cart/:id should delete a product in cart', async () => {
    const res = await request(app)
        .delete(`/cart/${cartId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

