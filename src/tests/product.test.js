const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')
const Image = require('../models/Image')
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
})

test('GET /products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /products ', async () => {
    const category = await Category.create({name: 'test'})
    const product = {
        title: "Oppo A57",
        description: "Descripción del telefono",
        categoryId: category.id,
        brand: "BBK Electronics",
        price: "200"
    }

    const res = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.title).toBe(product.title)
});

test('PUT /products ', async () => {
    const productUpdate = {
        title: "None",
        description: "None",
        brand: "None",
        price: "0"
    }

    const res = await request(app).put(`/products/${id}`).send(productUpdate).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
});

test('POST  /products/:id/product_images', async () => {
    const image = await Image.create({ url: "http://imagendeprueba.jgp", publicId: 'id'})
    const res = await request(app).post(`/products/${id}/product_images`).send([image.id]).set('Authorization', `Bearer ${token}`)
    await image.destroy;
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('DELETE /products ', async () => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});