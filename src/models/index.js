const Product = require('./Product')
const Category = require('./Category')
const Image = require('./Image')
const Cart = require('./Cart')
const Purchase = require('./Purchase')
const User = require('./User')

Product.belongsTo(Category)
Category.hasMany(Product)

Product.hasMany(Image)
Image.belongsTo(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Product.belongsToMany(Cart, {through: "productsCart"})
Cart.belongsToMany(Product, {through: "productsCart"})

Purchase.belongsTo(User)
User.hasMany(Purchase)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)