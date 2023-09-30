const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const purchases = await Purchase.findAll({where: {userId: req.user.id}});
    return res.json(purchases);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findAll({
        where: {userId},
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    })
    const purchases = await Purchase.bulkCreate(cart)
    await Cart.destroy({where: {userId}})
    return res.json(purchases)
})




module.exports = {
    getAll,
    create
}