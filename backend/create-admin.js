require('dotenv').config();
const mongoose = require('mongoose');

const createAdmin = async () => {
  try {
    console.log('Creating admin user...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const User = require('./models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists:');
      console.log(`Name: ${existingAdmin.name}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      await mongoose.connection.close();
      return;
    }
    
    // Option 1: Convert existing user to admin
    const existingUser = await User.findOne({ email: 'admin@123gmail.com' });
    if (existingUser) {
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ Converted existing user to admin:');
      console.log(`Name: ${existingUser.name}`);
      console.log(`Email: ${existingUser.email}`);
      console.log(`Role: ${existingUser.role}`);
    } else {
      // Option 2: Create new admin user
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@123gmail.com',
        password: 'admin@123',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Created new admin user:');
      console.log(`Name: ${adminUser.name}`);
      console.log(`Email: ${adminUser.email}`);
      console.log(`Role: ${adminUser.role}`);
      console.log('Password: admin@123');
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

createAdmin(); 