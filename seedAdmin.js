// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@admin.com',
      password: hashedPassword
    });
    console.log('✅ Admin created');
    process.exit();
  })
  .catch(err => console.error('❌ Error:', err));
