require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const fixAdminLogin = async () => {
  try {
    console.log('🔧 Fixing admin login...');
    
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
    
    // Delete existing admin user if exists
    const existingAdmin = await User.findOne({ email: 'admin@123gmail.com' });
    if (existingAdmin) {
      console.log('🗑️  Deleting existing admin user...');
      await User.findByIdAndDelete(existingAdmin._id);
      console.log('✅ Existing admin user deleted');
    }
    
    // Create new admin user with correct password
    const newAdmin = new User({
      name: 'Admin User',
      email: 'admin@123gmail.com',
      password: 'admin@123',
      role: 'admin'
    });
    
    await newAdmin.save();
    console.log('✅ New admin user created successfully!');
    console.log(`📧 Email: ${newAdmin.email}`);
    console.log(`🔑 Password: admin@123`);
    console.log(`👤 Role: ${newAdmin.role}`);
    
    // Test the password match
    const isPasswordValid = await newAdmin.matchPassword('admin@123');
    console.log(`🔐 Password validation test: ${isPasswordValid ? '✅ PASSED' : '❌ FAILED'}`);
    
    // Generate JWT token for testing
    try {
      const token = newAdmin.getSignedJwtToken();
      console.log('\n🎫 JWT Token for testing:');
      console.log(token);
    } catch (tokenError) {
      console.log('\n⚠️  Could not generate JWT token:', tokenError.message);
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    console.log('\n🎉 Admin login should now work with:');
    console.log('Email: admin@123gmail.com');
    console.log('Password: admin@123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

fixAdminLogin(); 