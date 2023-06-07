const request = require('supertest');
const app = require('../app');
// require('../models');

let userId;
let token;

test('POST /users should create user', async () => {
    const user = {
        firstName: "Yersain",
        lastName: "Castaño Arenas",
        email: "yersainarenas@gmail.com",
        password: "yersain123",
        phone: 3178584
    };
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login should login an user', async () => {
    const credentials = {
        email: "yersainarenas@gmail.com",
        password: "yersain123"
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users should get all users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('UPDATE /users/:id should update an user', async () => {
    const user = {
        firstName: "Alfonso"
    };
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(user)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('POST /users/login should login an user', async () => {
    const credentials = {
        email: "yersainens@gmail.com",
        password: "yersain"
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id should delete an user', async () => {
    const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});