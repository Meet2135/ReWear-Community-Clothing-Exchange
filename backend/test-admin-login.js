require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const testAdminLogin = async () => {
  try {
    console.log('🧪 Testing admin login...');
    
    // Set default JWT_SECRET if not in environment
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'your_super_secret_jwt_key_for_rewear_project_2025';
      console.log('⚠️  JWT_SECRET not found in .env, using default for development');
    }
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Check if admin user exists
    const adminUser = await User.findOne({ email: 'admin@123gmail.com' }).select('+password');
    
    if (!adminUser) {
      console.log('❌ Admin user not found! Run fix-admin-login.js first.');
      await mongoose.connection.close();
      return;
    }
    
    console.log('✅ Admin user found:');
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`👤 Role: ${adminUser.role}`);
    console.log(`🔑 Has password: ${adminUser.password ? 'Yes' : 'No'}`);
    
    // Test password match
    const isPasswordValid = await adminUser.matchPassword('admin@123');
    console.log(`🔐 Password validation: ${isPasswordValid ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (isPasswordValid) {
      // Generate JWT token
      const token = adminUser.getSignedJwtToken();
      console.log('\n🎫 JWT Token generated successfully:');
      console.log(token.substring(0, 50) + '...');
      
      console.log('\n✅ Admin login should work!');
      console.log('Try logging in with:');
      console.log('Email: admin@123gmail.com');
      console.log('Password: admin@123');
    } else {
      console.log('\n❌ Password validation failed!');
      console.log('The admin user exists but password is incorrect.');
      console.log('Run fix-admin-login.js to recreate the admin user.');
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testAdminLogin(); 