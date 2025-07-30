require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Test creating a user
    const User = require('./models/User');
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    await testUser.save();
    console.log('✅ Test user created successfully');
    
    // Find the test user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('✅ Test user found:', foundUser.name);
    
    // Clean up - delete test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('✅ Test user cleaned up');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

testConnection(); 