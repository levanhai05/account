const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri); // Không cần options vì Mongoose 7+ tự xử lý
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // dừng server nếu lỗi DB
  }
};

module.exports = connectDB;
