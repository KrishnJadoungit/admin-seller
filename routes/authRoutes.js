// routes/authRoutes.js

const express = require('express');
const router = express.Router();

const {
  adminLogin,
  createSeller,
  sellerLogin
} = require('../controllers/authController');

const { verifyAdmin } = require('../middlewares/authMiddleware');

// 🧑‍💼 Admin Routes
router.post('/admin/login', adminLogin);
router.post('/admin/create-seller', verifyAdmin, createSeller);

// 🛍️ Seller Route
router.post('/seller/login', sellerLogin);

module.exports = router;
