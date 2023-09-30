const request = require('supertest')
const app = require('../app')

let id;
let token;

test('POST /users deberá registrar los datos de un usuario', async () => {
    const user = {
        firstName: "Santiago",
        lastName: "Hernandez",
        email: "santiag@gmail.com",
        password: "12345678",
        phone: "3228977463"
    }

    const res = await request(app).post('/users').send(user)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
    expect(res.body.password).toBeFalsy()
});

test('POST /users/login', async () => {
    const user = {
        email: "derex@gmail.com",
        password: "12345678"
    }
    const res = await request(app).post('/users/login').send(user)
    token = res.body.token;

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
});

test('GET /users deberá retornar todos los usuarios', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
});

test('POST /users/login credenciales inválidas', async () => {
    const user = {
        email: "invalid@gmail.com",
        password: "12345678"
    }
    const res = await request(app).post('/users/login').send(user)
    expect(res.status).toBe(401)
});

test('PUT /users/:id', async () => { 
    const userUpdate = {
        firstName: "Kaiak",
        lastName: "Dark",
    }

    const res = await request(app).put(`/users/${id}`).send(userUpdate).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
});


test('DELETE /users/:id deberá eliminar un usuario', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});