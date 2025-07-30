require('dotenv').config();
const mongoose = require('mongoose');

const revertUserRole = async () => {
  try {
    console.log('Reverting user role...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const User = require('./models/User');
    
    // Find the user with email meet@gmail.com and revert to user role
    const user = await User.findOne({ email: 'meet@gmail.com' });
    if (user) {
      user.role = 'user';
      await user.save();
      console.log('✅ Reverted user role:');
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
    } else {
      console.log('❌ User not found');
    }
    
    // Show all users and their roles
    const allUsers = await User.find({}).select('name email role');
    console.log('\n📋 All users and their roles:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

revertUserRole(); 