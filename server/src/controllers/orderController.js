const Order = require('../models/Order');
const Product = require('../models/Product');


exports.create = async (req,res) => {
const { items, total } = req.body; // items: [{product, variantName, price, quantity}]
// simple implementation: reserve deliveredData from product.variant.deliveredData
const populatedItems = [];
for(const it of items){
const p = await Product.findById(it.product);
if(!p) return res.status(400).json({ message: 'Sản phẩm không tồn tại' });
const variant = p.variants.find(v => v.name === it.variantName);
if(!variant || (variant.stock < it.quantity)) return res.status(400).json({ message: 'Hết hàng' });
// pop account data
const delivered = variant.deliveredData.shift();
variant.stock -= it.quantity;
await p.save();
populatedItems.push({ ...it, deliveredData: delivered || '' });
}
const order = await Order.create({ user: req.user._id, items: populatedItems, total });
res.json(order);
};


exports.myOrders = async (req,res) => {
const orders = await Order.find({ user: req.user._id }).populate('items.product');
res.json(orders);
};