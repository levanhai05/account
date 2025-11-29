const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
items: [{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
variantName: String,
price: Number,
quantity: { type: Number, default: 1 },
deliveredData: String
}],
total: Number,
status: { type: String, enum: ['pending','paid','delivered','cancelled'], default: 'pending' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', OrderSchema);