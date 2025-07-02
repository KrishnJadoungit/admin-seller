// controllers/authController.js

const Admin = require('../models/Admin');
const Seller = require('../models/Seller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 🧑‍💼 Create Seller (Admin only)
exports.createSeller = async (req, res) => {
  try {
    const { name, email, mobileNo, country, state, skills, password } = req.body;

    const existing = await Seller.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      name,
      email,
      mobileNo,
      country,
      state,
      skills,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Seller created successfully', seller });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 🛍️ Seller Login
exports.sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: seller._id, role: seller.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: seller.role });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
