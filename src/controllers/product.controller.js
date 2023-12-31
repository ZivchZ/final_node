const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Image = require('../models/Image')

const getAll = catchError(async(req, res) => {
    const products = await Product.findAll({include: [Image]});
    return res.json(products);
});

const create = catchError(async(req, res) => {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.sendStatus(404);
    return res.json(product);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(product[0] === 0) return res.sendStatus(404);
    return res.json(product[1][0]);
});

const setProductImages = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id)
    if(!product) return res.status(404).json({message: 'Producto no encontrado'})
    await product.setImages(req.body)
    const images = await product.getImages();
    return res.json(images)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductImages
}