const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

const uploadImage = async (file, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'rewear',
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ],
      ...options
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

const uploadMultipleImages = async (files, options = {}) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, options));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};

module.exports = {
  configureCloudinary,
  uploadImage,
  deleteImage,
  uploadMultipleImages
}; 