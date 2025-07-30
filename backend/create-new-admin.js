require('dotenv').config();
const mongoose = require('mongoose');

const createNewAdmin = async () => {
  try {
    console.log('Creating new admin user...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const User = require('./models/User');
    
    // Create new admin user
    const adminUser = new User({
      name: 'Super Admin',
      email: 'superadmin@rewear.com',
      password: 'admin123456',
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('✅ Created new admin user:');
    console.log(`Name: ${adminUser.name}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Role: ${adminUser.role}`);
    console.log('Password: admin123456');
    console.log('\nYou can now login with these credentials!');
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

createNewAdmin(); 