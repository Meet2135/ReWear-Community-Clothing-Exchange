const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, '../uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
const itemsDir = path.join(uploadsDir, 'items');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir);
}
if (!fs.existsSync(itemsDir)) {
  fs.mkdirSync(itemsDir);
}

// Configure multer for item images (memory storage)
const itemStorage = multer.memoryStorage();

// Configure multer for avatar uploads (disk storage)
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

// Upload middleware for items (memory storage)
const upload = multer({
  storage: itemStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Upload middleware for avatars (disk storage)
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for avatars
  },
  fileFilter: fileFilter,
});

module.exports = { upload, uploadAvatar }; 