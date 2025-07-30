require('dotenv').config();
const mongoose = require('mongoose');

const testItemCreation = async () => {
  try {
    console.log('Testing item creation...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const Item = require('./models/Item');
    const User = require('./models/User');
    
    // Get a test user
    const user = await User.findOne({});
    if (!user) {
      console.log('❌ No users found. Please create a user first.');
      await mongoose.connection.close();
      return;
    }
    
    console.log('Using user:', user.name, user.email);
    
    // Test item data
    const testItem = {
      title: 'Test Item',
      description: 'This is a test item for testing purposes',
      category: 'men',
      type: 'shirts',
      size: 'M',
      condition: 'good',
      brand: 'Test Brand',
      color: 'Blue',
      material: 'Cotton',
      pointsValue: 50,
      location: 'Test Location',
      tags: ['test', 'sample'],
      user: user._id,
      status: 'active',
      isAvailable: true,
      isApproved: true
    };
    
    // Create test item
    const item = new Item(testItem);
    await item.save();
    
    console.log('✅ Test item created successfully:');
    console.log('Title:', item.title);
    console.log('Category:', item.category);
    console.log('User:', item.user);
    console.log('Status:', item.status);
    
    // Clean up - delete test item
    await Item.deleteOne({ _id: item._id });
    console.log('✅ Test item cleaned up');
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testItemCreation(); 