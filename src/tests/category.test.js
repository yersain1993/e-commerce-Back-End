const request = require('supertest');
const app = require('../app');
require('../models');

let token;
let categoryId;

beforeAll(async() => {
    const credentials = {
        email: "test@gmail.com",
        password: "test123"
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
});

test('POST /categories should create a one category', async () => {
    const category = {
        name: "Smatphones"
    };
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /categories should get all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('UPDATE /categories/:id should update a category', async () => {
    const category = {
        name: "Vehicles"
    };
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('DELETE /categories/:id should delete a category', async () => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});