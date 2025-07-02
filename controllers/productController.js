const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;
    const brands = JSON.parse(req.body.brands); 

    const formattedBrands = brands.map((brand, index) => ({
      brandName: brand.brandName,
      detail: brand.detail,
      image: req.files[index]?.filename || '',
      price: brand.price
    }));

    const newProduct = new Product({
      sellerId: req.user.userId,
      productName,
      productDescription,
      brands: formattedBrands
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getSellerProducts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const sellerId = req.user.userId;

  try {
    const products = await Product.find({ sellerId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments({ sellerId });

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
