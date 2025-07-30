require('dotenv').config();
const mongoose = require('mongoose');

const checkUsers = async () => {
  try {
    console.log('Checking users in database...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const User = require('./models/User');
    
    // Count all users
    const userCount = await User.countDocuments();
    console.log(`Total users in database: ${userCount}`);
    
    // Get all users (without password)
    const users = await User.find({}).select('-password');
    console.log('\nUsers in database:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}, Email: ${user.email}, Role: ${user.role}, Created: ${user.createdAt}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

checkUsers(); 