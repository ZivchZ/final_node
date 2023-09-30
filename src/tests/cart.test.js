const request = require('supertest')
const app = require('../app')
require('../models')

let token;
let id;

beforeAll(async () => {
    const body = {
        email: "kalev@gmail.com",
        password: "12345678"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token;
});

test('GET /carts', async () => {
    const res = await request(app).get('/carts').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /carts/:id', async () => {
    const body = { quantity: 3 }
    const res = await request(app).post('/carts').send(body).set('Authorization', `Bearer ${token}`)
    console.log(res.body)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.quantity).toBe(body.quantity)
});

// test('PUT /carts/:id', async () => {
//     const body = {
//         quantity: 2
//     }
//     const res = await request(app).put(`/carts/${id}`).send(body).set('Authorization', `Bearer ${token}`)
//     expect(res.status).toBe(200)
// });

test('DELETE /carts', async () => {
    const res = await request(app).delete(`/carts/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});
