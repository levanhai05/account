const mongoose = require('mongoose');


const VariantSchema = new mongoose.Schema({
name: String,
price: Number,
stock: Number,
deliveredData: [String] // array of account strings in stock
}, { _id: false });


const ProductSchema = new mongoose.Schema({
title: { type: String, required: true },
slug: { type: String, required: true, unique: true },
description: String,
category: String,
images: [String],
variants: [VariantSchema],
featured: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Product', ProductSchema);