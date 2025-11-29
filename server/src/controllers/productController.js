const Product = require('../models/Product');


exports.list = async (req,res) => {
const page = parseInt(req.query.page)||1;
const limit = parseInt(req.query.limit)||12;
const q = req.query.q ? { title: new RegExp(req.query.q, 'i') } : {};
if(req.query.category) q.category = req.query.category;
const skip = (page-1)*limit;
const [items, total] = await Promise.all([
Product.find(q).skip(skip).limit(limit),
Product.countDocuments(q)
]);
res.json({ items, total, page, pages: Math.ceil(total/limit) });
};


exports.get = async (req,res) => {
const p = await Product.findOne({ slug: req.params.slug });
if(!p) return res.status(404).json({ message: 'Không tìm thấy' });
res.json(p);
};