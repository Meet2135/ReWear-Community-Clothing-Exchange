require('dotenv').config();
const mongoose = require('mongoose');

const removeSkirtItem = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const Item = require('./models/Item');
    const result = await Item.deleteMany({ title: "Women's Casual Skirt" });
    console.log(`Removed ${result.deletedCount} item(s) with title 'Women's Casual Skirt'.`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error removing skirt item:', error);
  }
};

removeSkirtItem(); 