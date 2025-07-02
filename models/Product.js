const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  detail: { type: String },
  image: { type: String },
  price: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  productName: { type: String, required: true },
  productDescription: { type: String },
  brands: [brandSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
