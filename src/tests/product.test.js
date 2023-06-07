const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let token;
let productId;

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

test('POST /products should create a product', async () => {
    const category = await Category.create({ name:"Smatphones" })
    const product = {
        title: "Iphone 12",
        description: "Además, el dispositivo cuenta con cámara frontal de 8 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas",
        price: "2.000.000",
        brand: "Apple",
        categoryId: category.id
    };
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    productId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.status).toBeDefined();
});

test('GET /products should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /products/:id/images should set image in a product', async () => {
    const image = await ProductImg.create({
        url: "http://fakeimg.com",
        publicId: "false id",
    });
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});

test('UPDATE /producrs/:id should update a product', async () => {
    const product ={
        title: "Iphone 12",
        description: "Además, el dispositivo cuenta con cámara frontal de 8 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas",
        price: "2.000.000"
    };
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('DELETE /products/:id should delete a product', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});