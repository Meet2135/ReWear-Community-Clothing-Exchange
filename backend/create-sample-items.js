require('dotenv').config();
const mongoose = require('mongoose');

const createSampleItems = async () => {
  try {
    console.log('Creating sample items...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    const Item = require('./models/Item');
    const User = require('./models/User');
    
    // Get a user to assign items to
    const user = await User.findOne({});
    if (!user) {
      console.log('❌ No users found. Please create a user first.');
      await mongoose.connection.close();
      return;
    }
    
    console.log('Using user:', user.name, user.email);
    
    // Sample items data
    const sampleItems = [
      {
        title: "Classic Blue Denim Jacket",
        description: "A timeless denim jacket in perfect condition. Great for layering and goes with everything. Size M, excellent condition with no stains or tears.",
        category: "men",
        type: "jackets",
        size: "M",
        condition: "excellent",
        brand: "Levi's",
        color: "Blue",
        material: "Denim",
        pointsValue: 75,
        location: "New York",
        tags: ["denim", "jacket", "classic", "versatile"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
            publicId: "sample_jacket_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Vintage Floral Summer Dress",
        description: "Beautiful vintage floral dress perfect for summer events. Light and airy fabric, very comfortable. Size S, like-new condition.",
        category: "women",
        type: "dresses",
        size: "S",
        condition: "like-new",
        brand: "Vintage",
        color: "Floral",
        material: "Cotton",
        pointsValue: 60,
        location: "Los Angeles",
        tags: ["vintage", "floral", "summer", "dress"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
            publicId: "sample_dress_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Comfortable Running Shoes",
        description: "High-quality running shoes with excellent cushioning. Perfect for daily runs or casual wear. Size 9, good condition with minimal wear.",
        category: "shoes",
        type: "sports",
        size: "One Size",
        condition: "good",
        brand: "Nike",
        color: "White",
        material: "Mesh",
        pointsValue: 85,
        location: "Chicago",
        tags: ["running", "sports", "comfortable", "athletic"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
            publicId: "sample_shoes_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Cozy Winter Sweater",
        description: "Warm and cozy sweater perfect for cold weather. Soft wool blend, very comfortable. Size L, excellent condition.",
        category: "men",
        type: "sweaters",
        size: "L",
        condition: "excellent",
        brand: "Gap",
        color: "Gray",
        material: "Wool Blend",
        pointsValue: 55,
        location: "Boston",
        tags: ["winter", "warm", "cozy", "sweater"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            publicId: "sample_sweater_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Stylish Leather Handbag",
        description: "Elegant leather handbag with multiple compartments. Perfect for work or casual outings. Excellent condition with no scratches.",
        category: "bags",
        type: "other", // changed from 'handbags' to 'other'
        size: "One Size",
        condition: "excellent",
        brand: "Coach",
        color: "Brown",
        material: "Leather",
        pointsValue: 120,
        location: "Miami",
        tags: ["leather", "handbag", "elegant", "work"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
            publicId: "sample_bag_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Kids' Colorful T-Shirt",
        description: "Fun and colorful t-shirt for kids. Made from soft cotton, very comfortable for active children. Size S (kids), like-new condition.",
        category: "kids",
        type: "t-shirts",
        size: "S",
        condition: "like-new",
        brand: "Carters",
        color: "Multi-color",
        material: "Cotton",
        pointsValue: 25,
        location: "Seattle",
        tags: ["kids", "colorful", "comfortable", "cotton"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
            publicId: "sample_kids_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Trendy Women's Hoodie",
        description: "Soft and stylish hoodie, perfect for chilly evenings or casual outings. Size M, excellent condition.",
        category: "women",
        type: "hoodies",
        size: "M",
        condition: "excellent",
        brand: "H&M",
        color: "Pink",
        material: "Cotton Blend",
        pointsValue: 45,
        location: "San Francisco",
        tags: ["hoodie", "women", "casual", "pink"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
            publicId: "sample_hoodie_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Men's Formal Suit",
        description: "Elegant black formal suit, perfect for business meetings or special occasions. Size L, like-new condition.",
        category: "men",
        type: "suits",
        size: "L",
        condition: "like-new",
        brand: "Zara",
        color: "Black",
        material: "Polyester",
        pointsValue: 150,
        location: "Houston",
        tags: ["suit", "formal", "business", "black"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
            publicId: "sample_suit_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Kids' Raincoat",
        description: "Bright yellow raincoat for kids, keeps them dry and happy on rainy days. Size S (kids), new condition.",
        category: "kids",
        type: "coats",
        size: "S",
        condition: "new",
        brand: "OshKosh",
        color: "Yellow",
        material: "Polyester",
        pointsValue: 35,
        location: "Portland",
        tags: ["raincoat", "kids", "yellow", "new"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
            publicId: "sample_raincoat_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Men's Classic White T-Shirt",
        description: "A staple for any wardrobe. 100% cotton, size L, brand new and never worn.",
        category: "men",
        type: "t-shirts",
        size: "L",
        condition: "new",
        brand: "Uniqlo",
        color: "White",
        material: "Cotton",
        pointsValue: 20,
        location: "Austin",
        tags: ["t-shirt", "classic", "men", "cotton"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
            publicId: "sample_tshirt_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Women's Summer Shorts",
        description: "Lightweight and comfortable shorts, perfect for summer outings. Size M, excellent condition.",
        category: "women",
        type: "shorts",
        size: "M",
        condition: "excellent",
        brand: "Old Navy",
        color: "Blue",
        material: "Denim",
        pointsValue: 30,
        location: "San Diego",
        tags: ["shorts", "summer", "women", "denim"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
            publicId: "sample_shorts_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Kids' Pajama Set",
        description: "Soft and cozy pajama set for kids. Size S, like-new condition, fun cartoon print.",
        category: "kids",
        type: "sleepwear",
        size: "S",
        condition: "like-new",
        brand: "Gap Kids",
        color: "Green",
        material: "Cotton",
        pointsValue: 18,
        location: "Denver",
        tags: ["pajama", "kids", "sleepwear", "cartoon"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
            publicId: "sample_pajama_1",
            isPrimary: true
          }
        ]
      },
      {
        title: "Unisex Sports Cap",
        description: "Adjustable sports cap suitable for all. Breathable material, great for outdoor activities.",
        category: "accessories",
        type: "other",
        size: "One Size",
        condition: "excellent",
        brand: "Adidas",
        color: "Black",
        material: "Polyester",
        pointsValue: 15,
        location: "Dallas",
        tags: ["cap", "sports", "unisex", "accessories"],
        user: user._id,
        status: "active",
        isAvailable: true,
        isApproved: true,
        images: [
          {
            url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSfzYv1-08e-NkWIpAmTwy3cZWDYLXrjKFVyINehBd2Jgngy4A7sYTDbWRDbGzaZqd2kT0uQafe0i-iOIQbyMF0aQ7QhwohVIUaij4Uo9R3VNsaMkqqbQIXwQ",
            publicId: "sample_cap_1",
            isPrimary: true
          }
        ]
      }
    ];
    
    // Check which sample items already exist
    const existingTitles = (await Item.find({ title: { $in: sampleItems.map(item => item.title) } })).map(item => item.title);
    const itemsToInsert = sampleItems.filter(item => !existingTitles.includes(item.title));
    if (itemsToInsert.length === 0) {
      console.log('✅ All sample items already exist in database');
      await mongoose.connection.close();
      return;
    }
    
    // Create only new sample items
    const createdItems = await Item.insertMany(itemsToInsert);
    
    console.log('✅ Created new sample items:');
    createdItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title} - ${item.category} - ${item.pointsValue} points`);
    });
    
    console.log(`\n🎉 Successfully created ${createdItems.length} new sample items!`);
    console.log('Users can now see these items on the browse page.');
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

createSampleItems(); 