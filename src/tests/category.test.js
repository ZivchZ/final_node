const request = require('supertest')
const app = require('../app')

let token;
let id;

beforeAll(async () => {
    const body = {
        email: "kalev@gmail.com",
        password: "12345678"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token;
})

test('GET /categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /categories', async () => {
    const category = {
        name: "SmarthPhone"
    }

    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(category.name)
    expect(res.body.id).toBeDefined()
});

test('PUT /categories/:id', async () => {
    const categoryUpdate = {
        name: 'SmarthPhones'
    }

    const res = await request(app).put(`/categories/${id}`).send(categoryUpdate).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
});

test('DELETE /categories/:id', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});