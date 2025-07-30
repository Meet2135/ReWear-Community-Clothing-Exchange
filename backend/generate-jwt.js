require('dotenv').config();
const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateJWT = (userId, role = 'admin') => {
  const payload = {
    id: userId,
    role: role
  };
  
  // Use environment variable or default
  const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_for_rewear_project_2025';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  
  const token = jwt.sign(
    payload,
    secret,
    { expiresIn: expiresIn }
  );
  
  return token;
};

// Example usage
const userId = '507f1f77bcf86cd799439011'; // Example MongoDB ObjectId
const token = generateJWT(userId, 'admin');

console.log('Generated JWT Token:');
console.log(token);
console.log('\nTo use this token in API requests, add it to the Authorization header:');
console.log('Authorization: Bearer ' + token);
console.log('\nNote: Make sure your backend .env file has JWT_SECRET set for production use.'); 