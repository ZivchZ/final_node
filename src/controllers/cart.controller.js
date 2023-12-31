const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const carts = await Cart.findAll({include: [Product], where: {userId: req.user.id}});
    return res.json(carts);
});

const create = catchError(async(req, res) => {
    const { productId, quantity } = req.body
    const cart = await Cart.create({
        productId,
        quantity,
        userId: req.user.id
    });
    return res.status(201).json(cart);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Cart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(cart[0] === 0) return res.sendStatus(404);
    return res.json(cart[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}