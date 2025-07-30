require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');

const setupAdminComplete = async () => {
  try {
    console.log('🔧 Complete Admin Setup...');
    
    // Step 1: Ensure JWT_SECRET is set
    let jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      // Generate a secure JWT secret
      const crypto = require('crypto');
      jwtSecret = crypto.randomBytes(32).toString('hex');
      console.log('🔑 Generated new JWT_SECRET:', jwtSecret);
      
      // Create or update .env file
      const envPath = path.join(__dirname, '.env');
      let envContent = '';
      
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      // Add or update JWT_SECRET
      if (envContent.includes('JWT_SECRET=')) {
        envContent = envContent.replace(/JWT_SECRET=.*/, `JWT_SECRET=${jwtSecret}`);
      } else {
        envContent += `\nJWT_SECRET=${jwtSecret}`;
      }
      
      // Add other required environment variables if not present
      if (!envContent.includes('JWT_EXPIRE=')) {
        envContent += '\nJWT_EXPIRE=7d';
      }
      if (!envContent.includes('MONGODB_URI=')) {
        envContent += '\nMONGODB_URI=mongodb://localhost:27017/rewear';
      }
      if (!envContent.includes('PORT=')) {
        envContent += '\nPORT=5000';
      }
      if (!envContent.includes('NODE_ENV=')) {
        envContent += '\nNODE_ENV=development';
      }
      
      fs.writeFileSync(envPath, envContent.trim());
      console.log('✅ Updated .env file with JWT_SECRET');
      
      // Set the environment variable for this session
      process.env.JWT_SECRET = jwtSecret;
    } else {
      console.log('✅ JWT_SECRET already configured');
    }
    
    // Step 2: Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Step 3: Delete any existing admin users
    const existingAdmins = await User.find({ role: 'admin' });
    if (existingAdmins.length > 0) {
      console.log(`🗑️  Deleting ${existingAdmins.length} existing admin user(s)...`);
      for (const admin of existingAdmins) {
        await User.findByIdAndDelete(admin._id);
        console.log(`   Deleted admin: ${admin.email}`);
      }
    }
    
    // Step 4: Create new admin user
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
    
    // Step 5: Test password validation
    const isPasswordValid = await newAdmin.matchPassword('admin@123');
    console.log(`🔐 Password validation test: ${isPasswordValid ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (!isPasswordValid) {
      throw new Error('Password validation failed!');
    }
    
    // Step 6: Test JWT token generation
    try {
      const token = newAdmin.getSignedJwtToken();
      console.log('\n🎫 JWT Token generated successfully:');
      console.log(token.substring(0, 50) + '...');
      
      // Test token verification
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ JWT token verification: PASSED');
      console.log(`   User ID: ${decoded.id}`);
      console.log(`   Role: ${decoded.role}`);
      
    } catch (tokenError) {
      console.log('\n❌ JWT token generation failed:', tokenError.message);
      throw tokenError;
    }
    
    // Step 7: Test database query
    const testUser = await User.findOne({ email: 'admin@123gmail.com' }).select('+password');
    if (!testUser) {
      throw new Error('Admin user not found in database after creation!');
    }
    
    const testPasswordMatch = await testUser.matchPassword('admin@123');
    if (!testPasswordMatch) {
      throw new Error('Password validation failed on database query!');
    }
    
    console.log('✅ Database query test: PASSED');
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    console.log('\n🎉 Complete Admin Setup Successful!');
    console.log('\n📋 Summary:');
    console.log('   • JWT_SECRET configured');
    console.log('   • Admin user created');
    console.log('   • Password validation working');
    console.log('   • JWT token generation working');
    console.log('\n🔑 Login Credentials:');
    console.log('   Email: admin@123gmail.com');
    console.log('   Password: admin@123');
    console.log('\n⚠️  IMPORTANT: Restart your backend server for changes to take effect!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('Full error:', error);
  }
};

setupAdminComplete(); 